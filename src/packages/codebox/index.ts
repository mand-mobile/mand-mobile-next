import type { App } from 'vue'
import Codebox from './index.vue'

Codebox.install = (app: App) => {
  app.component(Codebox.name, Codebox)
}

export { focusAndOpenKeyboard } from './use-codebox'
export { Codebox }
export default Codebox
