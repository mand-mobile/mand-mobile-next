import type { App } from 'vue'
import { PullDown } from '../scroll-view'

PullDown.install = (app: App) => {
  app.component(PullDown.name, PullDown)
}

export { PullDown }
export default PullDown
