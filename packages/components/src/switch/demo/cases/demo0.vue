<template>
  <div class="md-example-child md-example-child-switch md-example-child-switch-0">
    <md-switch
      v-model="isActive"
      @change="handler('switch0', isActive, $event)"
    ></md-switch>
  </div>
</template>

<script>import Switch from '../../index'

export default {
  name: 'switch-demo',
  /* DELETE */
  title: '开启状态',
  titleEnUS: 'Open',
  /* DELETE */
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
      // eslint-disable-next-line no-console
      console.log(`Status of switch ${name} is ${active ? 'active' : 'inactive'}`)
    },
  },
}
</script>