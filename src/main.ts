import { createApp } from 'vue'
import {
  createRouter,
  createWebHashHistory,
} from 'vue-router'
import routes from 'virtual:generated-pages'
import App from './App.vue'

import './assets/stylus/app.styl'

if (import.meta.env.VITE_BUILD_BUNDLE) {
  import('dist/mand-mobile.esm.css')
}

const router = createRouter({
  history: createWebHashHistory(),
  routes,
})

createApp(App).use(router).mount('#app')
