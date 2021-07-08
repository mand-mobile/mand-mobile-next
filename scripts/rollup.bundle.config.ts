import path from 'path'
import { nodeResolve } from '@rollup/plugin-node-resolve'
import postcss from 'rollup-plugin-postcss'
import vue from 'rollup-plugin-vue'
import alias from '@rollup/plugin-alias'
import typescript from 'rollup-plugin-typescript2'
import esbuild from 'rollup-plugin-esbuild'
import replace from '@rollup/plugin-replace'

const outPubOptions = {
  globals: {
    vue: 'Vue',
  },
}

const input = 'src/packages/mand-mobile.ts'

const getPlugins = () => [
  replace({
    preventAssignment: true,
    values: {
      'import.meta.env.PROD': 'true',
    },
  }),
  nodeResolve(),
  vue({
    target: 'browser',
    preprocessStyles: true,
    preprocessOptions: {
      stylus: {
        additionalData: `@import '${process.cwd()}/src/styles/index.styl'`,
      },
    },
    exposeFilename: false,
  }),
  alias({
    entries: [
      {
        find: /^(mand-mobile\/)(.*)/,
        replacement: `${path.resolve(
          __dirname,
          '../src/packages'
        )}/$2/index.ts`,
      },
    ],
  }),
  esbuild({
    minify: true,
  }),
  // genCss(),
  postcss({
    extract: true,
  }),
]

const configs = []

configs.push({
  input,
  output: {
    file: `dist/es/mand-mobile.esm.js`,
    format: 'es',
    ...outPubOptions,
  },
  plugins: getPlugins(),
  external(id) {
    const reg =
      /^vue/.test(id) ||
      /^@vue/.test(id) ||
      /^@better-scroll/.test(id) ||
      /^jpeg-js/.test(id)
    return reg
  },
})

configs.push({
  input,
  output: {
    file: `dist/lib/mand-mobile.umd.js`,
    format: 'umd',
    name: `mand-mobile`,
    ...outPubOptions,
  },
  plugins: getPlugins(),
  external(id) {
    const reg =
      /^vue/.test(id) ||
      /^@vue/.test(id) ||
      /^jpeg-js/.test(id)
    return reg
  },
})

export default configs
