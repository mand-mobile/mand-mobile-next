import type { App } from 'vue'
import Steps from './index.vue'

Steps.install = (app: App) => {
  app.component(Steps.name, Steps)
}

export { Steps }
export default Steps
