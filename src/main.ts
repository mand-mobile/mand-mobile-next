import { createApp } from 'vue'
import {
  createRouter,
  createWebHashHistory,
} from 'vue-router'
import routes from 'virtual:generated-pages'
import App from './App.vue'

import './assets/stylus/app.styl'
import './styles/vars.styl'

if (import.meta.env.PROD) {
  import('dist/mand-mobile.min.css')
}

const router = createRouter({
  history: createWebHashHistory(),
  routes,
})

createApp(App).use(router).mount('#app')
