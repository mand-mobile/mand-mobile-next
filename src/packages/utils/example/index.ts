import { DefineComponent, defineComponent } from 'vue'
import MdIcon from 'mand-mobile/icon'
// eslint-disable-next-line @typescript-eslint/ban-types
type component = DefineComponent<{}, {}, any>

export const createDemoModule = (
  name: string,
  demos: component[]
) =>
  defineComponent({
    name: `${name}-demo`,
    components: {
      MdIcon,
    },
    setup() {
      return {
        demos,
      }
    },
  })
