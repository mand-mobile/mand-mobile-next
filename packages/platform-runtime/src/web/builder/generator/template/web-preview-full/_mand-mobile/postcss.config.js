
// https://github.com/michael-ciniawsky/postcss-load-config
module.exports = {
  plugins: [
    require('postcss-url')({url: 'inline'}),
    require('cssnano')({
      preset: ['default', {
        zindex: false,
        mergeIdents: false,
        discardUnused: false,
        autoprefixer: false,
        reduceIdents: false,
      }]
    }),
    require('postcss-pxtorem')({rootValue: 100, minPixelValue: 2})
  ]
}