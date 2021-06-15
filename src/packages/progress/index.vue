<template>
  <md-activity-indicator-rolling
    class="md-progress"
    :process="formatValue"
    :size="size"
    :width="width"
    :color="color"
    :border-color="borderColor"
    :fill="fill"
    :linecap="linecap"
    :rotate="rotate"
  >
    <slot></slot>
    <template #defs>
      <slot name="defs"></slot>
    </template>
  </md-activity-indicator-rolling>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { ActivityIndicatorRolling } from 'mand-mobile/activity-indicator'
import { useProgress, progressProps } from './use-progress'

export default defineComponent({
  name: 'MdProgress',
  components: {
    ['md-activity-indicator-rolling']:
      ActivityIndicatorRolling,
  },
  props: progressProps,
  setup(props) {
    return {
      ...useProgress(props),
    }
  },
})
</script>

<style lang="stylus"></style>
