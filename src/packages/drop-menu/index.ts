import type { App } from 'vue'
import DropMenu from './index.vue'

DropMenu.install = (app: App) => {
  app.component(DropMenu.name, DropMenu)
}

export { DropMenu }
export default DropMenu
