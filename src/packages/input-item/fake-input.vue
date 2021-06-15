<template>
  <div
    v-click-outside:[excludes]="blurHandler"
    class="md-fake-input"
    :class="{
      'is-focus': isFocus,
      'is-waiting': isFocus,
      disabled: disabled,
      readonly: readonly,
    }"
    @click="clickHandler"
  >
    <span
      class="md-fake-input-value"
      v-text="modelValue"
    ></span>
    <span
      v-if="modelValue === '' && placeholder !== ''"
      class="md-fake-input-placeholder"
      v-text="placeholder"
    ></span>
  </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue'
import {
  FOCUS_EVENT,
  BLUR_EVENT,
  UPDATE_MODEL_EVENT,
} from 'mand-mobile/utils'
import { clickOutside } from 'mand-mobile/directives'
import {
  useFakeInput,
  fakeInputProps,
} from './use-fake-input'

export default defineComponent({
  directives: {
    clickOutside,
  },
  props: fakeInputProps,
  emits: [FOCUS_EVENT, BLUR_EVENT, UPDATE_MODEL_EVENT],
  setup(props, context) {
    const { isFocus, clickHandler, blurHandler } =
      useFakeInput(props, context)

    return {
      isFocus,
      clickHandler,
      blurHandler,
    }
  },
})
</script>

<style lang="stylus">
.md-fake-input
  position relative
  width 100%
  height input-item-height
  color input-item-color
  font-size input-item-font-size
  font-weight input-item-font-weight
  font-family font-family-normal
  line-height input-item-height
  -webkit-appearance none
  border none
  background transparent
  outline none
  box-sizing border-box
  -webkit-tap-highlight-color transparent
  appearance none

.md-fake-input
  line-height input-item-height
  word-ellipsis()
  cursor text
  &::after
    position relative
    z-index 2
    display none
    content " "
    height input-item-font-size-large
    border-right solid 1.5px color-text-base
  &.is-focus:after
    display inline
  &.is-waiting:after
    animation keyboard-cursor infinite 1s step-start

.md-fake-input-placeholder
  position absolute
  top 0
  left 0
  width 100%
  color input-item-placeholder
  font-weight font-weight-normal
</style>
