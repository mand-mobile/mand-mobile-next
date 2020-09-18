import pageComponents from '@internal/page-components'

// https://github.com/vuejs/vuepress/issues/1173#issuecomment-470534176
export default ({ Vue }) => {
  for (const [name, component] of Object.entries(pageComponents)) {
    Vue.component(name, component)
  }
}