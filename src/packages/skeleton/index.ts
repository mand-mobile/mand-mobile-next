import type { App } from 'vue'
import Skeleton from './index.vue'

Skeleton.install = (app: App) => {
  app.component(Skeleton.name, Skeleton)
}

export { Skeleton }
export default Skeleton
