import type { App } from 'vue'
import Landscape from './index.vue'

Landscape.install = (app: App) => {
  app.component(Landscape.name, Landscape)
}

export { Landscape }
export default Landscape
