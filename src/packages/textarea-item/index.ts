import type { App } from 'vue'
import TextareaItem from './index.vue'

TextareaItem.install = (app: App) => {
  app.component(TextareaItem.name, TextareaItem)
}

export { TextareaItem }
export default TextareaItem
