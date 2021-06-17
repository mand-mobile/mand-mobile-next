import type { App } from 'vue'
import NumberKeyboard from './index.vue'

NumberKeyboard.install = (app: App) => {
  app.component(NumberKeyboard.name, NumberKeyboard)
}

export { NumberKeyboard }
export default NumberKeyboard
