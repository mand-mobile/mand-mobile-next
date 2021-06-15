import type { App } from 'vue'
import { RadioBox } from '../radio'

RadioBox.install = (app: App) => {
  app.component(RadioBox.name, RadioBox)
}

export { RadioBox }
export default RadioBox
