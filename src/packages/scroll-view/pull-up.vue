<template>
  <component
    :is="'div'"
    v-bind="{ class: 'md-scroll-pullup', ...$attrs }"
  >
    {{ pullUpText }}
  </component>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
export default defineComponent({
  props: {
    pullUpText: {
      type: String,
      default: '',
    },
  },
})
</script>
<style lang="stylus">
.md-scroll-pullup
  padding v-gap-lg 0
  font-size font-minor-large
  text-align center
  color color-text-caption
</style>
