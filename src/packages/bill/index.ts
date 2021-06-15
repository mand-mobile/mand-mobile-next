import type { App } from 'vue'
import Bill from './index.vue'

Bill.install = (app: App) => {
  app.component(Bill.name, Bill)
}

export { Bill }
export default Bill
