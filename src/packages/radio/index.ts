import type { App } from 'vue'
import Radio from './index.vue'
import RadioBox from './box.vue'
import RadioGroup from './group.vue'
import RadioList from './list.vue'

Radio.install = (app: App) => {
  app.component(Radio.name, Radio)
  app.component(RadioBox.name, RadioBox)
  app.component(RadioGroup.name, RadioGroup)
  app.component(RadioList.name, RadioList)
}

export { Radio, RadioBox, RadioGroup, RadioList }
export default Radio
