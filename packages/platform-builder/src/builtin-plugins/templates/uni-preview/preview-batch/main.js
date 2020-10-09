import Vue from 'vue'
import App from './App'

import '@mand-mobile/shared/lib/style/global.styl'

import uniPlugin from '@mand-mobile/platform-runtime/lib'

Vue.use(uniPlugin)

Vue.config.productionTip = false

App.mpType = 'app'

const app = new Vue({
  ...App,
})
app.$mount()
