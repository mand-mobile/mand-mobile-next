import type { App } from 'vue'
import { CheckBox } from '../check'

CheckBox.install = (app: App) => {
  app.component(CheckBox.name, CheckBox)
}

export { CheckBox }
export default CheckBox
