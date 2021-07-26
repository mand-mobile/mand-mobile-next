import path from 'path'
import klawSync from 'klaw-sync'
import { nodeResolve } from '@rollup/plugin-node-resolve'
import postcss from 'rollup-plugin-postcss'
import vue from 'rollup-plugin-vue'
import replace from '@rollup/plugin-replace'
import esbuild from 'rollup-plugin-esbuild'
import { genCss } from './plugin/rollup-plugin-gencss'

const PACKAGES_PATH = path.resolve(
  __dirname,
  '../src/packages'
)

const outPubOptions = {
  globals: {
    vue: 'Vue',
  },
  paths: (id) => {
    if (/^mand-mobile-next/.test(id)) {
      return id.replace('mand-mobile-next/', '../')
    }
  },
}

const configs = []

export const componentEntrys = klawSync(PACKAGES_PATH, {
  nofile: true,
  depthLimit: 0,
}).map((dir) => dir.path + '/index.ts')

export const componentOutFilePath = componentEntrys.map(
  (path) => path.split('/packages/')[1].replace(/\.ts$/, '')
)

export const componentNames = componentEntrys.map((path) =>
  path
    .split('/packages/')[1]
    .replace(/\.ts$/, '')
    .replace('/index', '')
)

componentEntrys.map((path, index) => {
  configs.push({
    input: path,
    output: [
      {
        file: `dist/es/${componentOutFilePath[index]}.js`,
        format: 'es',
        ...outPubOptions,
      },
      {
        file: `dist/lib/${componentOutFilePath[index]}.js`,
        format: 'cjs',
        ...outPubOptions,
      },
    ],
    plugins: [
      replace({
        preventAssignment: true,
        values: {
          'import.meta.env.PROD': 'true',
        },
      }),
      vue({
        target: 'browser',
        preprocessStyles: true,
        preprocessOptions: {
          stylus: {
            additionalData: `@import '${process.cwd()}/src/styles/index.styl';`,
          },
        },
        exposeFilename: false,
      }),
      esbuild(),
      nodeResolve(),
      genCss(),
      postcss({
        extract: true,
      }),
    ],
    external(id) {
      const reg =
        /^vue/.test(id) ||
        /^@vue/.test(id) ||
        /^mand-mobile-next\/.*/.test(id) ||
        /^@better-scroll/.test(id) ||
        /^jpeg-js/.test(id) ||
        /^\.\.\/.*/.test(id)
      return reg
    },
  })
})

export default configs
