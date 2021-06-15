import type { App } from 'vue'
import { RadioList } from '../radio'

RadioList.install = (app: App) => {
  app.component(RadioList.name, RadioList)
}

export { RadioList }
export default RadioList
