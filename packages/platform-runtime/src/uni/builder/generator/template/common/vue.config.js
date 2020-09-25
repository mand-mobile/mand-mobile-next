// @todo 收敛`vue.config.js`到模板工程内
const path = require('path')

//@fixme需要找更优雅的路径解析方式, 注意相对路径的hack，这个文件要放到相对于根路径的三级目录下 example: src/
const nodeModuleDir = path.resolve(__dirname, '../../node_modules')

function addStyleResource(rule) {
  const mandMobileSharedRoot = path.dirname(require.resolve('@mand-mobile/shared'))
  /**
   * @todo add nib style-resources
   */
  rule
    .use('style-resource')
    .loader('style-resources-loader')
    .options({
      patterns: [
        path.join(mandMobileSharedRoot, 'lib/style/mixin/theme.basic.styl'),
        path.join(mandMobileSharedRoot, 'lib/style/mixin/theme.components.styl'),
        path.join(mandMobileSharedRoot, 'lib/style/mixin/util.styl'),
      ],
    })
}

module.exports = {
  devServer: {
    watchOptions: {
      // @fixme 这条正则唯一的作用是更改了node_modules里边的文件也会重新编译，但并没有如预期排除node_module目录之外的文件的node_modules文件
      ignored: ['node_modules/!(@mand-mobile)/**/*'],
    },
  },
  configureWebpack: {
    resolve: {
      symlinks: false,
      //更改了执行环境会导致解析错误，所以这里要显示的指定要从当前根目录下的node_modules解析相关资源依赖，否则会解析去`vue-cli-plugin-mdbuilder`查找
      alias: {
        '@mand-mobile/platform/lib': path.join(__dirname, `_platform/lib/${process.env.MAND_PLATFORM}`),
        '@mand-mobile/shared': path.join(__dirname, '_shared'),
        'mand-mobile/lib': path.join(__dirname, '_mand-mobile/src'),
        'mand-mobile': path.join(__dirname, '_mand-mobile'),
      },
    },
  },
  chainWebpack: config => {
    /**
     * 根据环境变量，为webpack resovle 扩展平台相关代码 比如 index.web.vue 优先于 index.vue
     */
    if (process.env.MAND_PLATFORM) {
      const extFiletypes = Array.from(config.resolve.extensions.store)
      extFiletypes.forEach(ext => config.resolve.extensions.prepend(`.${process.env.MAND_PLATFORM}${ext}`))
    }

    const types = ['vue-modules', 'vue', 'normal-modules', 'normal']
    types.forEach(type => addStyleResource(config.module.rule('stylus').oneOf(type)))
  },
}
