import type { App } from 'vue'
import { PopupTitleBar } from '../popup'

PopupTitleBar.install = (app: App) => {
  app.component(PopupTitleBar.name, PopupTitleBar)
}

export { PopupTitleBar }
export default PopupTitleBar
