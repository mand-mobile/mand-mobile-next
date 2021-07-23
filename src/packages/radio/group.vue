<template>
  <div class="md-radio-group">
    <slot></slot>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
import { UPDATE_MODEL_EVENT } from 'mand-mobile-next/utils'
import { useRadioGroup } from './use-radio'

export default defineComponent({
  name: 'MdRadioGroup',
  props: {
    modelValue: {
      type: [String, Number, Boolean] as PropType<
        boolean | string | number
      >,
      default: '',
    },
  },
  emits: [UPDATE_MODEL_EVENT],
  setup(props, context) {
    useRadioGroup(props, context)
  },
})
</script>

<style lang="stylus"></style>
