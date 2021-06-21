import type { App } from 'vue'
import Captcha from './index.vue'

Captcha.install = (app: App) => {
  app.component(Captcha.name, Captcha)
}

export { Captcha }
export default Captcha
