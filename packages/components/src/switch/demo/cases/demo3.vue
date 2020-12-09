<template>
  <div class="md-example-child md-example-child-switch md-example-child-switch-3">
    <md-switch
      v-model="isActive"
      disabled
      @change="handler('switch3', isActive, $event)"
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
    title: '关闭不可用状态',
  },
  'en-US': {
    title: 'Disabled close',
  },
}
// #endregion ignore

</script>