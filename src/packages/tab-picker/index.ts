import type { App } from 'vue'
import TabPicker from './index.vue'

TabPicker.install = (app: App) => {
  app.component(TabPicker.name, TabPicker)
}

export { TabPicker }
export default TabPicker
