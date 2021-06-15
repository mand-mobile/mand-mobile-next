import type { App } from 'vue'
import Check from './index.vue'
import CheckBox from './box.vue'
import CheckGroup from './group.vue'
import CheckList from './list.vue'

Check.install = (app: App) => {
  app.component(Check.name, Check)
  app.component(CheckBox.name, CheckBox)
  app.component(CheckGroup.name, CheckGroup)
  app.component(CheckList.name, CheckList)
}

export { Check, CheckBox, CheckGroup, CheckList }
export default Check
