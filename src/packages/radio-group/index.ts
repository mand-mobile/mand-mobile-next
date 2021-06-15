import type { App } from 'vue'
import { RadioGroup } from '../radio'

RadioGroup.install = (app: App) => {
  app.component(RadioGroup.name, RadioGroup)
}

export { RadioGroup }
export default RadioGroup
