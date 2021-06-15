import type { App } from 'vue'
import Agree from './index.vue'

Agree.install = (app: App) => {
  app.component(Agree.name, Agree)
}

export { Agree }
export default Agree
