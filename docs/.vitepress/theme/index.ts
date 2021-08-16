import 'virtual:windi.css'
import './styles/vars.css'
import './styles/layout.css'
import './styles/code.css'
import './styles/custom-blocks.css'
import './styles/sidebar-links.css'
import './styles/mand-reset.styl'
import './styles/prism.styl'

import { Theme } from 'vitepress'
import Layout from './components/Layout.vue'
import NotFound from 'fisand-doc/dist/client/theme-default/NotFound.vue'
import Badge from './components/Badge.vue'

if (import.meta.env.DEV) {
  import('../../../dist/es/mand-mobile-next.min.css')
}

const theme: Theme = {
  Layout,
  NotFound,
  enhanceApp({ app }) {
    app.component('Badge', Badge)
  },
}

export default theme
