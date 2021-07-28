import { build, BuildOptions } from 'esbuild'
import { cwd } from 'process'
import fs from 'fs'
import { resolve } from 'path'
import ora from 'ora'
import klawSync from 'klaw-sync'
import stylus from 'stylus'
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
      'jpeg-js',
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
      'jpeg-js',
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
