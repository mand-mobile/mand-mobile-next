import type { App } from 'vue'
import Icon from './index.vue'

Icon.install = (app: App) => {
  app.component(Icon.name, Icon)
}

export { Icon }
export default Icon
