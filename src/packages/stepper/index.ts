import type { App } from 'vue'
import Stepper from './index.vue'

Stepper.install = (app: App) => {
  app.component(Stepper.name, Stepper)
}

export { Stepper }
export default Stepper
