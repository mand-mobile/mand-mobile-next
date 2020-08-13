const path = require('path')

module.exports = api => {
  const {target, 'component-name': componentName} = api.options

  const {components, category, MAND_INPUT_DIR = '.mand-mobile'} = api.context

  if (target === 'example' && componentName) {
    const component = components.find(component => component.dashedStyledName === componentName)
    api.$renderPartial(`${MAND_INPUT_DIR}`, './template/uni-preview-single-component/_mand-mobile')
    api.render(
      {
        [`${MAND_INPUT_DIR}/pages/index.vue`]: api.utils.commonTemplateResolver('demo-group.vue'),
        [`${MAND_INPUT_DIR}/vue.config.js`]: path.resolve(__dirname, './template/common/vue.config.js'),
      },
      {component},
    )
    return
  }

  if (target === 'example') {
    /**
         * 渲染全量组件
         * 神特么要用具名函数`renderPage`，否则cli基于获取当前执行目录名的方法要报错
         */
    api.$renderPartial(
      `${MAND_INPUT_DIR}`,
      './template/uni-preview-full/_mand-mobile',
      {
        components,
        category,
        // hack，否则单独编译_component.vue会报错
        dashedStyledName: '',
        camelCaseStyledName: '',
      },
      {},
    )

    /**
         * 渲染模板入口
         */
    components.forEach(function renderPage(component) {
      api.render(
        {
          [`${MAND_INPUT_DIR}/pages/${component.dashedStyledName}.vue`]: api.utils.commonTemplateResolver(
            'demo-group.vue',
          ),
          [`${MAND_INPUT_DIR}/vue.config.js`]: path.resolve(__dirname, './template/common/vue.config.js'),
        },
        {component},
      )
    })
  }

  if (target === 'lib') {
    /**
         * 渲染全量组件
         * 神特么要用具名函数`renderPage`，否则cli基于获取当前执行目录名的方法要报错
         */

    api.$renderPartial(
      `${MAND_INPUT_DIR}`,
      './template/uni-preview-full/_mand-mobile',
      {
        components,
        category,
        // hack，否则单独编译_component.vue会报错
        dashedStyledName: '',
        camelCaseStyledName: '',
      },
      {},
    )

    api.$renderComponents({
      target: `${MAND_INPUT_DIR}/_mand-mobile`,
      platform: 'uni',
    })

    /**
         * 渲染模板入口
         */
    components.forEach(function renderPage(component) {
      api.render(
        {
          [`${MAND_INPUT_DIR}/pages/${component.dashedStyledName}.vue`]: api.utils.commonTemplateResolver(
            'demo-group.vue',
          ),
          [`${MAND_INPUT_DIR}/vue.config.js`]: path.resolve(__dirname, './template/common/vue.config.js'),
        },
        {component},
      )
    })
  }

  if (target === 'src') {
    /**
     * 渲染全量组件
     * 神特么要用具名函数`renderPage`，否则cli基于获取当前执行目录名的方法要报错
     */
    api.$renderPartial(
      `${MAND_INPUT_DIR}`,
      './template/uni-preview-full/_mand-mobile',
      {
        components,
        category,
        // hack，否则单独编译_component.vue会报错
        dashedStyledName: '',
        camelCaseStyledName: '',
      },
      {},
    )

    api.$renderComponents({
      target: `${MAND_INPUT_DIR}/_mand-mobile`,
      platform: 'uni',
    })
    /**
         * 渲染模板入口
         */
    components.forEach(function renderPage(component) {
      api.render(
        {
          [`${MAND_INPUT_DIR}/pages/${component.dashedStyledName}.vue`]: api.utils.commonTemplateResolver(
            'demo-group.vue',
          ),
          [`${MAND_INPUT_DIR}/vue.config.js`]: path.resolve(__dirname, './template/common/vue.config.js'),
        },
        {component},
      )
    })
  }

  if (target === 'src') {
    /**
     * 渲染全量组件
     * 神特么要用具名函数`renderPage`，否则cli基于获取当前执行目录名的方法要报错
     */
    api.$renderPartial(
      `${MAND_INPUT_DIR}`,
      './template/uni-preview-full/_mand-mobile',
      {
        components,
        category,
        // hack，否则单独编译_component.vue会报错
        dashedStyledName: '',
        camelCaseStyledName: '',
      },
      {},
    )

    /**
         * 渲染模板入口
         */
    components.forEach(function renderPage(component) {
      api.render(
        {
          [`${MAND_INPUT_DIR}/pages/${component.dashedStyledName}.vue`]: api.utils.commonTemplateResolver(
            'demo-group.vue',
          ),
          [`${MAND_INPUT_DIR}/vue.config.js`]: path.resolve(__dirname, './template/common/vue.config.js'),
        },
        {component},
      )
    })
  }
}
