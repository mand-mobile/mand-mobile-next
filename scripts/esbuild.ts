import { build, BuildOptions, buildSync } from 'esbuild'
import { cwd } from 'process'
import fs from 'fs'
import { resolve, dirname } from 'path'
import ora from 'ora'
import klawSync from 'klaw-sync'
import stylus from 'stylus'
import { parse, init } from 'es-module-lexer'
import autoprefixer from 'autoprefixer'
import postcss from 'postcss'
import px2rem from 'postcss-pxtorem'
import vue from './plugin/esbuild-vue-plugin'
import { componentEntrys } from './rollup.config'

async function run(options?: BuildOptions) {
  await build({
    outdir: `${cwd()}/dist/es`,
    bundle: true,
    entryPoints: componentEntrys,
    plugins: [vue()],
    loader: { '.png': 'dataurl' },
    external: [
      'vue',
      'mand-mobile-next/*',
      '@vue/*',
      '@better-scroll/*',
    ],
    format: 'esm',
    minify: false,
    ...options,
  })
}

async function bundle(options?: BuildOptions) {
  await build({
    outfile: `${cwd()}/dist/es/mand-mobile.esm.js`,
    bundle: true,
    entryPoints: [`${cwd()}/src/packages/mand-mobile.ts`],
    plugins: [vue()],
    loader: { '.png': 'dataurl' },
    external: [
      'vue',
      'mand-mobile-next/*',
      '@vue/*',
      '@better-scroll/*',
    ],
    format: 'esm',
    minify: true,
    ...options,
  })
}
const spinner = ora('Build...').start()

Promise.all([
  run(),
  run({
    format: 'cjs',
    outdir: `${cwd()}/dist/lib`,
  }),
  // bundle(),
  // bundle({
  //   outfile: `${cwd()}/dist/lib/mand-mobile.umd.js`,
  //   format: 'iife',
  // }),
])
  .then(async () => {
    await combineCss()
    await combineDepsCss()
    await genFullCss()

    spinner.succeed('Done !')
  })
  .catch(() => {
    spinner.succeed('Failed !')
  })

async function combineCss() {
  const allCss = klawSync(`${cwd()}/dist/es`, {
    nofile: true,
    depthLimit: 0,
  }).map((dir) => dir.path + '/index.css')

  const compilerCSS = (file: string) => {
    const code = fs.readFileSync(file, 'utf-8')
    return new Promise((resolve, reject) => {
      stylus(code).render((err, css) => {
        if (err) {
          console.log(err)
          reject(err)
        } else {
          resolve(css)
        }
      })
    })
  }

  // build vars.styl
  const cssResult = (await compilerCSS(
    resolve(cwd(), 'src/styles/vars.styl')
  )) as string
  const varsName = 'mand-mobile-next.vars.css'
  await fs.promises.writeFile(
    resolve(cwd(), 'dist/es', varsName),
    cssResult
  )
  await fs.promises.writeFile(
    resolve(cwd(), 'dist/lib', varsName),
    cssResult
  )

  let content = cssResult
  for (const css of allCss) {
    if (fs.existsSync(css)) {
      content += await fs.promises.readFile(css, 'utf8')
    }
  }

  // override bundle css
  await Promise.all([
    fs.promises.writeFile(
      `${cwd()}/dist/es/mand-mobile.esm.css`,
      content
    ),
    fs.promises.writeFile(
      `${cwd()}/dist/lib/mand-mobile.umd.css`,
      content
    ),
  ])

  const name = 'mand-mobile-next.min.css'
  await Promise.all([
    fs.promises.rename(
      `${cwd()}/dist/es/mand-mobile.esm.css`,
      `${cwd()}/dist/es/${name}`
    ),
    fs.promises.rename(
      `${cwd()}/dist/lib/mand-mobile.umd.css`,
      `${cwd()}/dist/lib/${name}`
    ),
  ])

  await Promise.all([
    build({
      entryPoints: [`${cwd()}/dist/es/${name}`],
      minify: true,
      outfile: `${cwd()}/dist/es/${name}`,
      allowOverwrite: true,
    }),
    build({
      entryPoints: [`${cwd()}/dist/lib/${name}`],
      minify: true,
      outfile: `${cwd()}/dist/lib/${name}`,
      allowOverwrite: true,
    }),
  ])
}

async function combineDepsCss() {
  const PATH_RE = /^\.*\//
  const alljs = klawSync(`${cwd()}/dist/es`, {
    nofile: true,
    depthLimit: 0,
  }).map((dir) => dir.path + '/index.js')
  await init
  alljs.forEach((js) => {
    const [imports] = parse(fs.readFileSync(js, 'utf-8'))
    const cssFile = resolve(dirname(js), './index.css')

    const selfCss = `import './index.css'\n`
    const depsCss = imports
      .flat()
      .map((item) => item.n)
      .filter(
        (n) =>
          !n.endsWith('utils') &&
          !n.endsWith('directives') &&
          !n.endsWith('locale') &&
          !n.endsWith('composable')
      )
      .filter((n) => PATH_RE.test(n))
      .map((n) => `import '${n}/index.css'`)
      .join('\n')
    const styleFile = resolve(dirname(js), './style.js')
    if (!fs.existsSync(cssFile)) {
      fs.writeFileSync(styleFile, depsCss + '\n')
    } else {
      fs.writeFileSync(styleFile, depsCss + '\n' + selfCss)
    }

    buildSync({
      entryPoints: [styleFile],
      format: 'cjs',
      outfile: resolve(
        dirname(js).replace('/es/', '/lib/'),
        './style.js'
      ),
    })
  })
}

async function genFullCss() {
  const css = await fs.promises.readFile(
    `${cwd()}/dist/lib/mand-mobile-next.min.css`
  )
  const result = await postcss([
    autoprefixer(),
    px2rem({
      rootValue: 32,
      propWhiteList: [],
      minPixelValue: 2,
    }),
  ]).process(css, {
    from: `${cwd()}/dist/lib/mand-mobile-next.min.css`,
  })

  await fs.promises.writeFile(
    `${cwd()}/dist/lib/mand-mobile-next.full.css`,
    result.css
  )
}
