<template>
  <div class="md-stepper" :class="{ disabled: disabled }">
    <div
      class="md-stepper-button md-stepper-button-reduce"
      :class="{ disabled: isMin }"
      @click="reduce"
    ></div>
    <div class="md-stepper-number">
      <input
        type="tel"
        :size="contentLength"
        :readOnly="readOnly"
        :disabled="disabled"
        :value="currentNum"
        @input="onInput"
        @focus="onFocus"
        @blur="onChange"
      />
    </div>
    <div
      class="md-stepper-button md-stepper-button-add"
      :class="{ disabled: isMax }"
      @click="add"
    ></div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import {
  stepperProps,
  useStepper,
  emits,
} from './use-stepper'

export default defineComponent({
  name: 'MdStepper',
  props: stepperProps,
  emits: emits,
  setup(props, context) {
    return {
      ...useStepper(props, context),
    }
  },
})
</script>

<style lang="stylus">
@import './index.styl'

.md-stepper
  color var(--md-stepper-color)
  -webkit-font-smoothing antialiased
  font-size var(--md-stepper-font-size)
  height var(--md-stepper-height)
  display flex
  &.disabled
    .md-stepper-button
      &:before,
      &:after
        opacity var(--md-stepper-disabled-opacity)
    input
      opacity var(--md-stepper-disabled-opacity)

.md-stepper-button
  position relative
  width var(--md-stepper-width-button)
  height var(--md-stepper-height)
  background-color var(--md-stepper-fill)
  border-radius var(--md-stepper-radius-button)
  &:after
    content ""
    position absolute
    width 24px
    height 2px
    top 50%
    left 50%
    background var(--md-stepper-color)
    transform translate(-50%, -50%)
  &.md-stepper-button-add
    &:before
      content ""
      position absolute
      width 2px
      height 24px
      top 50%
      left 50%
      background var(--md-stepper-color)
      transform translate(-50%, -50%)
  &.disabled
    &:before,
    &:after
      opacity var(--md-stepper-disabled-opacity)

.md-stepper-number
  margin 0 4px
  min-width var(--md-stepper-width-input)
  height var(--md-stepper-height)
  padding 0 4px
  text-align center
  border-radius var(--md-stepper-radius-input)
  background-color var(--md-stepper-fill)
  input
    width 100%
    height var(--md-stepper-height)
    border none
    outline none
    font-size var(--md-stepper-input-font-size)
    line-height var(--md-stepper-height)
    background-color transparent
    box-sizing border-box
    text-align center
    color var(--md-stepper-color)
</style>
