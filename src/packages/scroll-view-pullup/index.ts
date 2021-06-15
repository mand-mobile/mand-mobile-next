import type { App } from 'vue'
import { PullUp } from '../scroll-view'

PullUp.install = (app: App) => {
  app.component(PullUp.name, PullUp)
}

export { PullUp }
export default PullUp
