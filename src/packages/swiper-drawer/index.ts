import type { App } from 'vue'
import SwiperDrawer from './index.vue'

SwiperDrawer.install = (app: App) => {
  app.component(SwiperDrawer.name, SwiperDrawer)
}

export { SwiperDrawer }
export default SwiperDrawer
