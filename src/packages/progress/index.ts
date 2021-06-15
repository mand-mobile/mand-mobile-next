import type { App } from 'vue'
import Progress from './index.vue'

Progress.install = (app: App) => {
  app.component(Progress.name, Progress)
}

export { Progress }
export default Progress
