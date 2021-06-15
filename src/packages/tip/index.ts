import type { App } from 'vue'
import Tip from './index.vue'

Tip.install = (app: App) => {
  app.component(Tip.name, Tip)
}

export { Tip }
export default Tip
