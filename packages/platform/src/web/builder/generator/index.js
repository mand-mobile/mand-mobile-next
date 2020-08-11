const path = require('path')
module.exports = api => {
  const {
    target, 
    'component-name': componentName} = api.options
  
  const {
    components,
    category,
    MAND_INPUT_DIR = '.mand-mobile',
  } = api.context

  /**
   * 打包组件，构建入口
   */
  if (target === 'bundle') {
    // api.render('./template/web-bundle', {components})
    api.$renderPartial(`${MAND_INPUT_DIR}`, './template/web-bundle/_mand-mobile', {components})
    
    api.$renderComponents({
      target: `${MAND_INPUT_DIR}/_mand-mobile`,
      platform: 'web',
    })
    
    api.render({
      [`${MAND_INPUT_DIR}/vue.config.js`]: path.resolve(__dirname, 'template/common/vue.config.js'),
      [`${MAND_INPUT_DIR}/postcss.config.js`]: api.utils.commonTemplateResolver('postcss.config.js'),
    })
    return 
  }

  /**
   * 渲染示例, 特定组件
   */
  if (target === 'example' && componentName) {
    const component = components.find((component) => component.dashedStyledName === componentName)
    if (!component) { return }
    // api.render('./template/web-preview-single-component/.mand-mobile', {component})
    api.$renderPartial(`${MAND_INPUT_DIR}`, './template/web-preview-single-component/_mand-mobile', {component})
    api.render({
      [`${MAND_INPUT_DIR}/demo-group.vue`]: api.utils.commonTemplateResolver('demo-group.vue'),
      [`${MAND_INPUT_DIR}/vue.config.js`]: path.resolve(__dirname, 'template/common/vue.config.js'),    
    }, {component})
    
    return
  }


  if (target === 'lib' || target === 'lib-vw' ) {
    // 添加依赖
    // api.extendPackage({
    //   devDependencies: {
    //     'vue-router': '^3.3.3',
    //     'fastclick': '^1.0.6',
    //   }
    // })
    api.$renderPartial(`${MAND_INPUT_DIR}`, './template/web-preview-full/_mand-mobile', {
      components,
      category,
    })

    api.$renderComponents({
      target: `${MAND_INPUT_DIR}/_mand-mobile`,
      platform: 'web',
    })

  }
  

  /**
   * 渲染全量示例
   */
  if (target === 'example') {
    // 添加依赖
    api.extendPackage({
      devDependencies: {
        'vue-router': '^3.3.3',
        'fastclick': '^1.0.6',
      }
    })
    api.$renderPartial(`${MAND_INPUT_DIR}`, './template/web-preview-full/_mand-mobile', {
      components,
      category,
    })
    /**
     * 渲染模板入口
     */
    components.forEach(function renderPage(component) {
        api.render({
            [`${MAND_INPUT_DIR}/pages/${component.dashedStyledName}.vue`]: api.utils.commonTemplateResolver('demo-group.vue'),
            [`${MAND_INPUT_DIR}/vue.config.js`]: path.resolve(__dirname, 'template/common/vue.config.js'),
        }, { component })
    })
  }
}