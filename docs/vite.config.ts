import { UserConfig } from 'vite'
import Components from 'vite-plugin-components'
import Icons, { ViteIconsResolver } from 'vite-plugin-icons'
import WindiCSS from 'vite-plugin-windicss'
import path from 'path'

const config: UserConfig = {
  resolve: {
    alias: {
      'mand-mobile/': `${path.resolve(
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
            '../src/styles/index.styl'
          )}`,
        ],
      },
    },
  },
  optimizeDeps: {
    exclude: ['vue-demi', '@vueuse/shared', '@vueuse/core'],
  },
  server: {
    hmr: {
      overlay: false,
    },
  },
  plugins: [
    Components({
      dirs: ['.vitepress/theme/components'],
      customLoaderMatcher: (id) => id.endsWith('.md'),
      customComponentResolvers: [
        ViteIconsResolver({
          componentPrefix: '',
        }),
      ],
    }),
    Icons(),
    WindiCSS({
      preflight: false,
    }),
  ],
}

export default config
