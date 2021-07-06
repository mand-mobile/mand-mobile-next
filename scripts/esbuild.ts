import { build, BuildOptions } from 'esbuild'
import { cwd } from 'process'
import fs from 'fs'
import ora from 'ora'
import klawSync from 'klaw-sync'
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
      'mand-mobile/*',
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
      'mand-mobile/*',
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

  let content = ''
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

  const name = 'mand-mobile.min.css'
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
}
