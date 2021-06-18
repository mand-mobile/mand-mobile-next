import type { App } from 'vue'
import InputItem from './index.vue'
import FakeInputItem from './fake-input.vue'

InputItem.install = (app: App) => {
  app.component(InputItem.name, InputItem)
  app.component(FakeInputItem.name, FakeInputItem)
}

export { formatMoney } from './use-input'
export { InputItem }
export default InputItem
