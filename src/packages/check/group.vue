<template>
  <div class="md-check-group">
    <slot></slot>
  </div>
</template>
<script lang="ts">
import { defineComponent, PropType } from 'vue'
import { useCheckGroup } from './use-check'

export default defineComponent({
  name: 'MdCheckGroup',
  props: {
    modelValue: {
      type: Array as PropType<Array<string | number>>,
      default: () => {
        /* istanbul ignore next */
        return []
      },
    },
    max: {
      type: Number,
      default: 0,
    },
  },
  setup: (props) => {
    const { toggleAll } = useCheckGroup(props)

    return { toggleAll }
  },
})
</script>
<style lang="stylus"></style>
