import type { App } from 'vue'
import CellItem from './index.vue'

CellItem.install = (app: App) => {
  app.component(CellItem.name, CellItem)
}

export { CellItem }
export default CellItem
