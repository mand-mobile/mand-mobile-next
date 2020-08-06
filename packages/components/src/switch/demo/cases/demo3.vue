<template>
  <div class="md-example-child md-example-child-switch md-example-child-switch-3">
    <md-switch
      v-model="isActive"
      disabled
      @change="handler('switch3', isActive, $event)"
    ></md-switch>
  </div>
</template>

<script>import Switch from '../../index'

export default {
  name: 'switch-demo',
  /* DELETE */
  title: '关闭不可用状态',
  titleEnUS: 'Closed and disabled',
  /* DELETE */
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
      // eslint-disable-next-line no-console
      console.log(`Status of switch ${name} is ${active ? 'active' : 'inactive'}`)
    },
  },
}
</script>