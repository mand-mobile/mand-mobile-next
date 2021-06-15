import type { App } from 'vue'
import TabBar from './index.vue'

TabBar.install = (app: App) => {
  app.component(TabBar.name, TabBar)
}

export { TabBar }
export default TabBar
