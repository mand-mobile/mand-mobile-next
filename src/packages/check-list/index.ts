import type { App } from 'vue'
import { CheckList } from '../check'

/* istanbul ignore next */
CheckList.install = (app: App) => {
  app.component(CheckList.name, CheckList)
}

export { CheckList }
export default CheckList
