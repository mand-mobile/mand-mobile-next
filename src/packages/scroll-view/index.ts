import type { App } from 'vue'
import ScrollView from './index.vue'
import PullDown from './pull-down.vue'
import PullUp from './pull-up.vue'

ScrollView.install = (app: App) => {
  app.component(ScrollView.name, ScrollView)
  app.component(PullDown.name, PullDown)
  app.component(PullUp.name, PullUp)
}

export { ScrollView, PullDown, PullUp }
export default ScrollView
