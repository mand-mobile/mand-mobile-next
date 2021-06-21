import type { App } from 'vue'
import Picker from './index.vue'
import PickerView from './picker-view.vue'
import { popupProps, usePopup } from './use-popup'

Picker.install = (app: App) => {
  app.component(Picker.name, Picker)
}

export { Picker, PickerView, popupProps, usePopup }
export default Picker
