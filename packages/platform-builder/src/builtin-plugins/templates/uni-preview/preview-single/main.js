import Vue from 'vue'
import App from './App'

import '@mand-mobile/shared/lib/style/global.styl'

// #ifdef H5
// import webPlugin from './platform/web'
// Vue.use(webPlugin)
// #endif

// #ifdef  MP
import uniPlugin from '@mand-mobile/platform-runtime/lib'

Vue.use(uniPlugin)
// #endif

Vue.config.productionTip = false

App.mpType = 'app'

const app = new Vue({
  ...App,
})
app.$mount()
