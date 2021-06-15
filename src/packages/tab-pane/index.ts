import type { App } from 'vue'
import { TabPane } from '../tabs'

TabPane.install = (app: App) => {
  app.component(TabPane.name, TabPane)
}

export { TabPane }
export default TabPane
