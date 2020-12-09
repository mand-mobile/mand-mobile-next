import pageComponents from '@internal/page-components'
import Dialog from 'mand-mobile/lib/dialog/dialog'
import Toast from 'mand-mobile/lib/toast/toast'
import Icon from 'mand-mobile/lib/icon'

import VueClipboard from 'vue-clipboard2'

const root = typeof window !== 'undefined' ? window : global

if (root.document) {
  Dialog.shadowRoot = root.document.head
  Toast.shadowRoot = root.document.head
  Icon.getRootNode = el => {
    const root = el.getRootNode()
    return root instanceof ShadowRoot ? root : root.document
  }
}

// https://github.com/vuejs/vuepress/issues/1173#issuecomment-470534176
export default ({ Vue: _Vue, options }) => {
  for (const [name, component] of Object.entries(pageComponents)) {
    _Vue.component(name, component)
  }
  _Vue.use(VueClipboard)
}