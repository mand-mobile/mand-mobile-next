import type { App } from 'vue'
import Selector from './index.vue'

Selector.install = (app: App) => {
  app.component(Selector.name, Selector)
}

export { useShow } from './use-selector'
export { Selector }
export default Selector
