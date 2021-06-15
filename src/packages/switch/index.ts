import type { App } from 'vue'
import Switch from './index.vue'

Switch.install = (app: App) => {
  app.component(Switch.name, Switch)
}

export { Switch }
export default Switch
