import type { App } from 'vue'
import NoticeBar from './index.vue'

NoticeBar.install = (app: App) => {
  app.component(NoticeBar.name, NoticeBar)
}

export { NoticeBar }
export default NoticeBar
