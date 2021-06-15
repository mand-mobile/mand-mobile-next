<template>
  <div
    v-if="!disabled"
    class="md-tab-pane"
    role="tabpanel"
    :tab="name"
  >
    <slot></slot>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { paneProps, usePane } from './use-tabs'

export default defineComponent({
  props: paneProps,
  setup(props) {
    usePane(props)
  },
})
</script>

<style lang="stylus">
.md-tab-pane
  position relative
  width 100%
  transform translateZ(0)
</style>
