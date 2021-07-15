<template>
  <div
    class="md-switch"
    :class="[
      disabled ? 'disabled' : '',
      modelValue ? 'active' : '',
    ]"
    @click="onChange"
  ></div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { UPDATE_MODEL_EVENT } from 'mand-mobile/utils'

export default defineComponent({
  name: 'MdSwitch',
  props: {
    modelValue: {
      type: Boolean,
      default: false,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
  },
  emits: [UPDATE_MODEL_EVENT],
  setup(props, { emit }) {
    const onChange = () => {
      emit(UPDATE_MODEL_EVENT, !props.modelValue)
    }

    return { onChange }
  },
})
</script>

<style lang="stylus">
@import './index.styl'

.md-switch
  box-sizing border-box
  position relative
  width 80px
  height 48px
  border-radius 48px
  background-color var(--md-switch-fill-inverse)
  transition background .3s
  &.disabled
    opacity var(--md-switch-item-color-disabled)
    pointer-events none
  &::before, &::after
    content ""
    position absolute
    transition transform .3s
  &::before
    top 0
    left 0
    width 80px
    height 48px
    border-radius 24px
    background-color var(--md-switch-fill-inverse)
  &::after
    top 4px
    left 4px
    width 40px
    height 40px
    background-color var(--md-switch-handle-color)
    border-radius 50%
  &.active
    background-color var(--md-switch-fill)
  &.active::before
      transform scale(0)
  &.active::after
      transform translateX(32px)
</style>
