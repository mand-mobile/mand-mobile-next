import type { App } from 'vue'
import ResultPage from './index.vue'

ResultPage.install = (app: App) => {
  app.component(ResultPage.name, ResultPage)
}

export { ResultPage }
export default ResultPage
