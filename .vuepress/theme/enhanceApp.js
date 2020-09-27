import pageComponents from '@internal/page-components'
import Dialog from 'mand-mobile/lib/dialog/dialog'
import Toast from 'mand-mobile/lib/toast/toast'
import Icon from 'mand-mobile/lib/icon'

Dialog.shadowRoot = document.head
Toast.shadowRoot = document.head
Icon.getRootNode = el => {
  const root = el.getRootNode()
  return root instanceof ShadowRoot ? root : document
}

// https://github.com/vuejs/vuepress/issues/1173#issuecomment-470534176
export default ({ Vue: _Vue, options }) => {
  for (const [name, component] of Object.entries(pageComponents)) {
    _Vue.component(name, component)
  }
}