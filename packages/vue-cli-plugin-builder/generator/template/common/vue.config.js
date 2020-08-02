// @todo 收敛`vue.config.js`到模板工程内
const path = require('path')

//@fixme需要找更优雅的路径解析方式, 注意相对路径的hack，这个文件要放到相对于根路径的二级目录下 example: src/
const nodeModuleDir = path.resolve(__dirname, '../node_modules')

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
      // @fixme 这条正则唯一的作用是更改了node_modules里边的文件也会重新编译，但并没有如预期排除node_module/@mand-mobile目录之外的文件的node_modules文件
      ignored: ['node_modules/!(@mand-mobile)/**/*'],
    },
  },
  configureWebpack: {
    resolve: {
      symlinks: false,
      //更改了执行环境会导致解析错误，所以这里要显示的指定要从当前根目录下的node_modules解析相关资源依赖，否则会解析去`vue-cli-plugin-mdbuilder`查找
      alias: {
        '@mand-mobile/components': path.join(nodeModuleDir, '@mand-mobile/components'),
        '@mand-mobile/platform/lib': path.join(nodeModuleDir, `@mand-mobile/platform/src/${process.env.MAND_PLATFORM}`),
        '@mand-mobile/shared': path.join(nodeModuleDir, '@mand-mobile/shared'),
        'mand-mobile': path.join(nodeModuleDir, '@mand-mobile/components/src'),
      },
    },
  },
  chainWebpack: config => {
    config.plugin('html').tap(args => {
      args[0].template = '.mand-mobile/public/index.html'
      return args
    })

    const types = ['vue-modules', 'vue', 'normal-modules', 'normal']
    types.forEach(type => addStyleResource(config.module.rule('stylus').oneOf(type)))
  },
}
