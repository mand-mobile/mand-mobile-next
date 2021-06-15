import type { App } from 'vue'
import Swiper from './index.vue'

Swiper.install = (app: App) => {
  app.component(Swiper.name, Swiper)
}

export { Dragger } from './dragger'
export { Swiper }
export default Swiper
