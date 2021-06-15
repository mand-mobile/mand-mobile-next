import type { App } from 'vue'
import Slider from './index.vue'

Slider.install = (app: App) => {
  app.component(Slider.name, Slider)
}

export { Slider }
export default Slider
