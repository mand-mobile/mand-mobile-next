const componentsJson = require('../../src/packages/components.json')
const genZhPath = (comp) => ({
  text: `${comp.text}`,
  link: `/zh-CN/components${comp.path}`,
  name: `${comp.name}`,
})

const genEnPath = (comp) => ({
  name: `${comp.text}`,
  link: `/en-US/components${comp.path}`,
  text: `${comp.name}`,
})

const componenSidebar = (pathGenor) => ({
  name: 'components',
  text: 'COMPONENTS',
  children: [
    {
      text: 'Basic',
      children: [...componentsJson[0].list.map(pathGenor)],
    },
    {
      text: 'Feedback',
      children: [...componentsJson[2].list.map(pathGenor)],
    },
    {
      text: 'Business',
      children: [...componentsJson[1].list.map(pathGenor)],
    },
    {
      text: 'Form',
      children: [...componentsJson[3].list.map(pathGenor)],
    },
    {
      text: 'Gesture',
      children: [...componentsJson[4].list.map(pathGenor)],
    },
  ],
})

const zhComponentsSidebarConfig = [
  {
    text: '更新日志',
    link: '/zh-CN/components/',
  },
  {
    text: '快速开始',
    link: '/zh-CN/components/quick-start',
  },
  componenSidebar(genZhPath),
]

/**
 * @type {import('vitepress').UserConfig}
 */
module.exports = {
  base: '/mand-mobile-next/',
  title: 'Mand Mobile',
  description: 'mand mobile doc',
  head: [
    [
      'link',
      {
        rel: 'icon',
        type: 'image/png',
        href: '/mand-mobile-next/favicon.png',
      },
    ],
    [
      'link',
      {
        rel: 'dns-prefetch',
        href: 'https://fonts.gstatic.com',
      },
    ],
    [
      'link',
      {
        rel: 'preconnect',
        crossorigin: 'anonymous',
        href: 'https://fonts.gstatic.com',
      },
    ],
    [
      'link',
      {
        href: 'https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:wght@200;400;500&family=Inter:wght@200;400;500;600',
        rel: 'stylesheet',
      },
    ],
    [
      'link',
      {
        rel: 'stylesheet',
        href: '/mand-mobile-next/mand-mobile-next.min.css',
      },
    ],
  ],
  lang: 'zh-CN',
  themeConfig: {
    repo: 'https://github.com/mand-mobile/mand-mobile-next',
    docsBranch: 'vue3',
    editLinks: true,
    editLinkText: '为此文档提供修改建议',
    logo: 'https://pt-starimg.didistatic.com/static/starimg/img/ySOsAunfGm1610683661213.png',
    nav: [
      { text: '组件', link: '/zh-CN/components/' },
      {
        text: '2.x',
        link: 'https://didi.github.io/mand-mobile/',
      },
    ],
    navEn: [
      { text: 'Components', link: '/en-US/components/' },
      {
        text: '2.x',
        link: 'https://didi.github.io/mand-mobile/',
      },
    ],
    sidebar: {
      '/zh-CN/components/': [...zhComponentsSidebarConfig],
      '/en-US/components/': [
        {
          text: 'Changelog',
          link: '/en-US/components/',
        },
        {
          text: 'QuickStart',
          link: '/en-US/components/quick-start',
        },
        componenSidebar(genEnPath),
      ],
    },
  },

  markdown: {
    config: (md) => {
      md.use(require('./plugins/demo'))
    },
  },
}
