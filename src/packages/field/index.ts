import type { App } from 'vue'
import Field from './index.vue'
import FieldItem from './item.vue'

Field.install = (app: App) => {
  app.component(Field.name, Field)
  app.component(FieldItem.name, FieldItem)
}

export { Field, FieldItem }
export default Field
