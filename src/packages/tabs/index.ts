import type { App } from 'vue'
import Tabs from './index.vue'
import TabPane from './pane.vue'

Tabs.install = (app: App) => {
  app.component(Tabs.name, Tabs)
  app.component(TabPane.name, TabPane)
}

export { Tabs, TabPane }
export default Tabs
