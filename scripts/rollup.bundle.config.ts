import { nodeResolve } from '@rollup/plugin-node-resolve'
import postcss from 'rollup-plugin-postcss'
import vue from 'rollup-plugin-vue'
import typescript from 'rollup-plugin-typescript2'
import replace from '@rollup/plugin-replace'
import { genCss } from './plugin/rollup-plugin-gencss'

const outPubOptions = {
  globals: {
    vue: 'Vue',
  },
  paths: (id) => {
    if (/^mand-mobile/.test(id)) {
      return id.replace('mand-mobile/', '../')
    }
  },
}

const configs = []

configs.push({
  input: 'src/packages/mand-mobile.ts',
  output: [
    {
      file: `dist/es/mand-mobile.esm.js`,
      format: 'es',
      ...outPubOptions,
    },
    {
      file: `dist/lib/mand-mobile.umd.js`,
      format: 'umd',
      name: `mand-mobile`,
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
    typescript({
      tsconfigOverride: {
        compilerOptions: {
          declaration: true,
          emitDeclarationOnly: true,
        },
        include: [
          'src/packages/**/*',
          'src/shims-vue.d.ts',
        ],
        exclude: [
          'node_modules',
          'src/packages/**/__test__/*',
          'src/packages/**/demo/*',
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
    genCss(),
    postcss({
      extract: true,
    }),
  ],
  external(id) {
    const reg =
      /^vue/.test(id) ||
      /^@vue/.test(id) ||
      /^@better-scroll/.test(id) ||
      /^jpeg-js/.test(id)
    return reg
  },
})

export default configs
