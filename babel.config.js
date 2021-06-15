/**
 * 此文件仅仅单测
 * 解决单测问题env文件中 vite的环境变量获取import.meta.env
 * https://github.com/vitejs/vite/issues/1149
 */
module.exports = {
  presets: [
    [
      '@babel/preset-env',
      {
        useBuiltIns: 'entry',
        corejs: '2',
        targets: { node: 'current' },
      },
    ],
    '@babel/preset-typescript',
  ],
  plugins: [
    function () {
      return {
        visitor: {
          MetaProperty(path) {
            path.replaceWithSourceString('process')
          },
        },
      }
    },
  ],
}
