import type { App } from 'vue'
import InputItem from './index.vue'

InputItem.install = (app: App) => {
  app.component(InputItem.name, InputItem)
}

export { formatMoney } from './use-input'
export { InputItem }
export default InputItem
