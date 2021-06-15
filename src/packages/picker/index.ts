import type { App } from 'vue'
import Picker from './index.vue'

Picker.install = (app: App) => {
  app.component(Picker.name, Picker)
}

export { Picker }
export default Picker
