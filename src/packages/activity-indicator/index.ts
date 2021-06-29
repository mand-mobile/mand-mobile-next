import type { App } from 'vue'
import ActivityIndicator from './index.vue'
import ActivityIndicatorRolling from './roller.vue'
import ActivityIndicatorSuccess from './roller-success.vue'

ActivityIndicator.install = (app: App) => {
  app.component(ActivityIndicator.name, ActivityIndicator)
}

export {
  ActivityIndicator,
  ActivityIndicatorRolling,
  ActivityIndicatorSuccess,
}
export default ActivityIndicator
