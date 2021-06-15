import type { App } from 'vue'
import Popup from './index.vue'
import PopupTitleBar from './title-bar.vue'

Popup.install = (app: App) => {
  app.component(Popup.name, Popup)
  app.component(PopupTitleBar.name, PopupTitleBar)
}

export { Popup, PopupTitleBar }
export default Popup
