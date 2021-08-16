import { UserConfig } from 'vite'
import path from 'path'
import WindiCSS from 'vite-plugin-windicss'

const config: UserConfig = {
  resolve: {
    alias: {
      'mand-mobile-next/': `${path.resolve(
        __dirname,
        '../dist/es'
      )}/`,
    },
  },
  css: {
    preprocessorOptions: {
      stylus: {
        imports: [
          `${path.join(
            __dirname,
            '../src/styles/variable.styl'
          )}`,
          `${path.join(
            __dirname,
            '../src/styles/util.styl'
          )}`,
        ],
      },
    },
  },
  plugins: [
    WindiCSS({
      config: {
        extract: {
          include: [
            '**/*.md',
            '.vitepress/theme/**/*.{md,vue}',
            `${process.cwd()}/node_modules/fisand-doc/**/*.md`,
            `${process.cwd()}/node_modules/fisand-doc/**/*.vue`,
          ],
        },
      },
    }),
  ],
  optimizeDeps: {
    exclude: ['vue-demi', '@vueuse/shared', '@vueuse/core'],
  },
  server: {
    hmr: {
      overlay: false,
    },
  },
}

export default config
