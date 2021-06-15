import type { App } from 'vue'
import Amount from './index.vue'

Amount.install = (app: App) => {
  app.component(Amount.name, Amount)
}

export { Amount }
export default Amount
