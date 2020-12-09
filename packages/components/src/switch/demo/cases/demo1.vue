<template>
  <div class="md-example-child md-example-child-switch md-example-child-switch-1">
    <md-switch
      v-model="isActive"
      @change="handler('switch1', isActive, $event)"
    ></md-switch>
  </div>
</template>

<script>
import Switch from 'mand-mobile/lib/switch'

export default {
  components: {
    'md-switch': Switch,
  },
  data() {
    return {
      isActive: false,
    }
  },
  methods: {
    handler(name, active) {
      console.log(`Status of switch ${name} is ${active ? 'active' : 'inactive'}`)
    },
  },
}
// #region ignore
export const metaInfo = {
  'zh-CN': {
    title: '关闭状态',
  },
  'en-US': {
    title: 'Closed',
  },
}
// #endregion ignore

</script>