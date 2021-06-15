import type { App } from 'vue'
import WaterMark from './index.vue'

WaterMark.install = (app: App) => {
  app.component(WaterMark.name, WaterMark)
}

export { WaterMark }
export default WaterMark
