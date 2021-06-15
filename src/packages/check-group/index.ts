import type { App } from 'vue'
import { CheckGroup } from '../check'

CheckGroup.install = (app: App) => {
  app.component(CheckGroup.name, CheckGroup)
}

export { CheckGroup }
export default CheckGroup
