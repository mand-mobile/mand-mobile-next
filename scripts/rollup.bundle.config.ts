import { nodeResolve } from '@rollup/plugin-node-resolve'
import postcss from 'rollup-plugin-postcss'
import vue from 'rollup-plugin-vue'
import typescript from 'rollup-plugin-typescript2'
import replace from '@rollup/plugin-replace'
import { terser } from 'rollup-plugin-terser'
// import { genCss } from './plugin/rollup-plugin-gencss'

const outPubOptions = {
  globals: {
    vue: 'Vue',
  },
  paths: (id) => {
    if (/^mand-mobile/.test(id)) {
      return id.replace('mand-mobile/', './')
    }
  },
}

const input = 'src/packages/mand-mobile.ts'

const getPlugins = () => [
  terser(),
  replace({
    preventAssignment: true,
    values: {
      'import.meta.env.PROD': 'true',
    },
  }),
  typescript({
    tsconfigOverride: {
      compilerOptions: {
        declaration: true,
        emitDeclarationOnly: false,
      },
      include: ['src/packages/**/*', 'src/shims-vue.d.ts'],
      exclude: [
        'node_modules',
        'src/packages/**/__test__/*',
        'src/packages/**/demo/*',
        'docs',
      ],
      abortOnError: false,
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
      /^mand-mobile\//.test(id) ||
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
