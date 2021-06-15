import type { App } from 'vue'
import ActionBar from './index.vue'

ActionBar.install = (app: App) => {
  app.component(ActionBar.name, ActionBar)
}

export { ActionBar }
export default ActionBar
