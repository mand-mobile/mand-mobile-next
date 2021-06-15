import type { App } from 'vue'
import ActivityIndicator from './index.vue'
import ActivityIndicatorRolling from './roller.vue'

ActivityIndicator.install = (app: App) => {
  app.component(ActivityIndicator.name, ActivityIndicator)
}

export { ActivityIndicator, ActivityIndicatorRolling }
export default ActivityIndicator
