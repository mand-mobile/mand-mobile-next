import type { App } from 'vue'
import DatePicker from './index.vue'

DatePicker.install = (app: App) => {
  app.component(DatePicker.name, DatePicker)
}

export { DatePicker }
export default DatePicker
