import type { App } from 'vue'
import { FieldItem } from '../field'

FieldItem.install = (app: App) => {
  app.component(FieldItem.name, FieldItem)
}

export { FieldItem }
export default FieldItem
