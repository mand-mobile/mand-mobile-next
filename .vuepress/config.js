const path = require('path')
const resolve = file => path.resolve(__dirname, file)

const componentsSidebarConfig = [
  {
    name: 'components',
    title: 'COMPONENTS',
    children: [{
      name: 'basic',
      title: 'Basic',
    }, {
      name: 'feedback',
      title: 'Feedback',
    }, {
      name: 'business',
      title: 'Business',
    }, {
      name: 'form',
      title: 'Form',
    }, {
      name: 'gesture',
      title: 'Gesture',
    }]
  }
]

module.exports = {
  title: 'Mand Mobile 3',
  base: '/mand-mobile/',
  head: [
    ['meta', { 'http-equiv': 'X-UA-Compatible', content: 'IE=edge,chrome=1' }],
    ['meta', { name: 'viewport', content: 'width=device-width,initial-scale=1,maximum-scale=1,user-scalable=no,viewport-fit=cover' }],
    ['meta', { name: 'format-detection', content: 'telephone=no,email=no' }],
    ['meta', { name: 'apple-mobile-web-app-capable', content: 'yes' }],
    ['meta', { name: 'apple-touch-fullscreen', content: 'yes' }]
  ],
  themeConfig: {
    logo: 'https://manhattan.didistatic.com/static/manhattan/mand/docs/mand-logo-black.svg',
    locales: {
      '/': {
        nav: [
          { text: '首页', link: '/' },
          { text: '组件', link: '/packages/components/', redirect: '/packages/components/development' },
          { text: '平台', link: '/packages/platform', redirect: '/packages/platform' },
          { text: '2.x', link: 'https://didi.github.io/mand-mobile' },
          { text: 'Github', link: 'https://github.com/mand-mobile/mand-mobile-next' },
        ],
        sidebar: {
          '/packages/components/': [
            {
              name: 'development',
              title: '开发指南'
            }, {
              name: 'changelog',
              title: '更新日志'
            }, 
            ...componentsSidebarConfig
          ],
        }
      },
      '/en-US/': {
        nav: [
          { text: 'Home', link: '/' },
          { text: 'Component', link: '/en-US/packages/components/', redirect: '/en-US/packages/components/development' },
          { text: 'Platform', link: '/en-US/packages/platform', redirect: '/en-US/packages/platform' },
          { text: '2.x', link: 'https://didi.github.io/mand-mobile' },
          { text: 'Github', link: 'https://github.com/mand-mobile/mand-mobile-next' },
        ],
        sidebar: {
          '/en-US/packages/components/': [
            {
              name: 'development',
              title: 'Development Guide'
            }, {
              name: 'changelog',
              title: 'Change Log'
            }, 
            ...componentsSidebarConfig
          ],
        }
      }
    }
    // sidebarDepth: 2
  },
  patterns: [
    // '**/*.vue',
     '**/*.md',
    // '**/packages/**/button/**/*.md',
    '!**/packages/examples/**',
    '!**/node_modules/**',
    '!**/.mand-mobile/**',
    // '!**/test/**/*.spec.js',
    // '**/packages/components/src/button/*.md',
    // '!./packages/**/*.md',
    // './packages/components/**/*.md',
  ],
  markdown: {
    toc: { includeLevel: [2, 3, 4] }
  },
  locales: {
    '/': {
      lang: 'zh-CN',
      description: 'Vue 驱动的静态网站生成器'
    },
    '/en-US/': {
      lang: 'en-US',
      description: 'Vue-powered Static Site Generator'
    },
  },   
  plugins: [
    require('./plugins/dynamic-locals/index.js'),
    require('./plugins/dynamic-demos/index.js'),
    require('./plugins/dynamic-component-info/index.js'),
  ],
  stylus: {
    import: [
      resolve('./theme/styles/mand-mobile.styl')
    ]
  },
  configureWebpack: config => {
    config.resolve.alias['mand-mobile/lib'] = resolve('../packages/components/src')
    config.resolve.alias['@mand-mobile/platform/lib'] = resolve('../packages/platform/src/web')
    config.resolve.alias['@mand-mobile'] = resolve('../packages')

    config.resolve.extensions = ['.web.js', '.web.vue', '.js', '.vue', '.json']
  }
}