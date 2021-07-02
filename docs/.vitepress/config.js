module.exports = {
  title: 'Mand Mobile',
  description: 'mand mobile doc',
  head: [
    ['link', { rel: 'icon', type: 'image/png', href: '/favicon.png' }],
    ['link', { rel: 'dns-prefetch', href: 'https://fonts.gstatic.com' }],
    ['link', { rel: 'preconnect', crossorigin: 'anonymous', href: 'https://fonts.gstatic.com' }],
    ['link', { href: 'https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:wght@200;400;500&family=Inter:wght@200;400;500;600', rel: 'stylesheet' }],
  ],
  lang: 'zh-CN',
  themeConfig: {
    // algolia: {
    //   apiKey: 'your_api_key',
    //   indexName: 'index_name',
    //   searchParameters: {
    //     facetFilters: ['tags:guide,api']
    //   }
    // },
    repo: 'https://github.com/mand-mobile/mand-mobile-next',
    editLinks: true,
    editLinkText: '为此文档提供修改建议',
    logo: 'https://pt-starimg.didistatic.com/static/starimg/img/ySOsAunfGm1610683661213.png',
    nav: [
      { text: '组件', link: '/components/' },
      { text: 'RoadMap', link: '/roadmap' },
    ],

    sidebar: {
    }
  }
}
