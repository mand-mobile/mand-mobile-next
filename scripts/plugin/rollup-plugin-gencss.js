/**
 * rollup-plugin-vue 好像无法正确解析 stylus vars，因此添加这个插件保证 css 生成正确
 */
import stylus from 'stylus'

/**
 * @type {() => import('vite').Plugin}
 */
export function genCss() {
  return {
    name: 'roll-plugin-gencss',
    async transform(code, id) {
      if (/lang\.css$/g.test(id)) {
        const curCss = await injectStylusVars(code)
        return {
          code: curCss,
          map: null,
        }
      }
    },
  }
}

export function injectStylusVars(code) {
  return new Promise((resolve, reject) => {
    stylus(code, {
      imports: [`${process.cwd()}/src/styles/index.styl`],
    }).render((err, css) => {
      if (err) {
        reject(err)
      } else {
        resolve(css)
      }
    })
  })
}
