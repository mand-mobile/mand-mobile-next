import type { App } from 'vue'
import DetailItem from './index.vue'

DetailItem.install = (app: App) => {
  app.component(DetailItem.name, DetailItem)
}

export { DetailItem }
export default DetailItem
