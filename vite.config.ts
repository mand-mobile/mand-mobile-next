import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import Pages from 'vite-plugin-pages'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    outDir: 'example',
    cssCodeSplit: true,
  },
  css: {
    preprocessorOptions: {
      stylus: {
        imports: [
          `${path.join(
            __dirname,
            'src/styles/index.styl'
          )}`,
        ],
      },
    },
  },
  plugins: [
    vue(),
    vueJsx(),
    Pages({
      pagesDir: [
        { dir: 'src/pages', baseRoute: '' },
        {
          dir: 'src/packages',
          baseRoute: '',
        },
      ],
      exclude: [
        '*/*.vue',
        '*/test/*.vue',
        '*/demo/demo[0-9].vue',
      ],
      extensions: ['vue'],
    }),
  ],
  resolve: {
    alias: {
      'mand-mobile/':
        process.env.NODE_ENV !== 'preview'
          ? `${path.resolve(__dirname, './src/packages')}/`
          : `${path.resolve(__dirname, './dist/es')}/`,
      'dist/': `${path.resolve(__dirname, './dist/es')}/`,
    },
  },
})
