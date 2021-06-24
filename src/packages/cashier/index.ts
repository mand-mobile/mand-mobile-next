import type { App } from 'vue'
import Cashier from './index.vue'

Cashier.install = (app: App) => {
  app.component(Cashier.name, Cashier)
}

export { Cashier }
export default Cashier
