<template>
  <div class="md-example-child md-example-child-switch md-example-child-switch-2">
    <md-switch
      v-model="isActive"
      disabled
      @change="handler('switch2', isActive, $event)"
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
      isActive: true,
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
    title: '开启不可用状态',
  },
  'en-US': {
    title: 'Disabled open',
  },
}
// #endregion ignore

</script>