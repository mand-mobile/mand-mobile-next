import type { App } from 'vue'
import Transition from './index.vue'

Transition.install = (app: App) => {
  app.component(Transition.name, Transition)
}

export { Transition }
export default Transition
