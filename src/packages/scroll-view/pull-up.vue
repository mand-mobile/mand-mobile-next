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
  padding var(--md-v-gap-lg) 0
  font-size var(--md-font-minor-large)
  text-align center
  color var(--md-color-text-caption)
</style>
