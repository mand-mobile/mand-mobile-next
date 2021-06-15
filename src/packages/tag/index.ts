import type { App } from 'vue'
import Tag from './index.vue'

Tag.install = (app: App) => {
  app.component(Tag.name, Tag)
}

export { Tag }
export default Tag
