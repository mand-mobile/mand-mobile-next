<template>
  <md-field-item
    class="md-input-item"
    :class="[
      isHighlight ? 'is-highlight' : '',
      isTitleLatent ? 'is-title-latent' : '',
      isNativeInputFocus ? 'is-focus' : '',
      disabled ? 'is-disabled' : '',
      isAmount ? 'is-amount' : '',
      clearable ? 'is-clear' : '',
      align,
      size,
    ]"
    :title="title"
    :solid="solid && !isTitleLatent"
  >
    <template #left>
      <slot name="left"></slot>
    </template>

    <!-- input or hidden input -->
    <input
      v-if="!isVirtualKeyboard"
      ref="nativeInputRef"
      class="md-input-item-input"
      autocomplete="off"
      :type="nativeInputType"
      :placeholder="placeholder"
      :disabled="disabled"
      :readonly="readonly"
      :value="innerValue"
      :maxlength="
        nativeInputMaxLength ? Infinity : maxlength
      "
      @focus="focusHandler"
      @blur="blurHandler"
      @input="nativeInputHandler"
    />
    <md-fake-input
      v-else
      :placeholder="placeholder"
      :disabled="disabled"
      :readonly="readonly"
      :model-value="innerValue"
    ></md-fake-input>

    <template #right>
      <div
        v-if="clearable"
        v-show="isNativeInputFocus"
        class="md-input-item-clear"
      >
        <md-icon name="clear" />
      </div>
      <slot name="right"></slot>
    </template>
  </md-field-item>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import MdFieldItem from 'mand-mobile/field-item'
import MdIcon from 'mand-mobile/icon'
import {
  UPDATE_MODEL_EVENT,
  FOCUS_EVENT,
  BLUR_EVENT,
} from 'mand-mobile/utils'
import MdFakeInput from './fake-input.vue'
import {
  useInput,
  useInputDisplay,
  inputProps,
} from './use-input'

export default defineComponent({
  name: 'MdInputItem',
  components: { MdFieldItem, MdIcon, MdFakeInput },
  props: inputProps,
  emits: [UPDATE_MODEL_EVENT, FOCUS_EVENT, BLUR_EVENT],
  setup(props) {
    const {
      nativeInputType,
      isNativeInputFocus,
      focusHandler,
      blurHandler,
    } = useInputDisplay(props)
    const {
      innerValue,
      nativeInputRef,
      nativeInputHandler,
      nativeInputMaxLength,
    } = useInput(props)

    return {
      nativeInputType,

      innerValue,
      nativeInputRef,
      nativeInputHandler,

      nativeInputMaxLength,

      isNativeInputFocus,
      focusHandler,
      blurHandler,
    }
  },
})
</script>

<style lang="stylus">
.md-input-item
  .md-field-item-content
    padding-top 0
    padding-bottom 0
  .md-field-item-control
    display flex
    align-items center

.md-input-item-clear
  padding 10px 0
  color input-item-icon
  .md-icon
    display flex
    background color-bg-base
    border-radius radius-circle

.md-input-item-input,
.md-fake-input
  // display flex
  width 100%
  height input-item-height
  color input-item-color
  font-size input-item-font-size
  font-weight input-item-font-weight
  font-family font-family-normal
  line-height 1
  -webkit-appearance none
  border none
  background transparent
  outline none
  box-sizing border-box
  -webkit-tap-highlight-color transparent
  appearance none

.md-input-item-input
  &:disabled, &[disabled]
    opacity 1
  &::-webkit-input-placeholder
    color input-item-placeholder
    font-weight font-weight-normal
  &::-webkit-outer-spin-button, &::-webkit-inner-spin-button
    -webkit-appearance none

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

.md-input-item-msg,
.md-input-item-brief
  word-break()
  &:not(:last-child)
    margin-bottom 10px

.md-input-item-brief
  font-size input-item-font-size-brief
  color input-item-color-brief

.md-input-item-msg
  font-size input-item-font-size-error
  color input-item-color-error

.md-input-item
  &.left
    .md-input-item-input,
    .md-fake-input
      text-align left

  &.center
    .md-input-item-input,
    .md-fake-input
      text-align center

  &.right
    .md-input-item-input,
    .md-input-item-fake
      text-align right

  &.is-title-latent
    .md-field-item-title
      position absolute
      top 50%
      left 0
      height auto
      font-size input-item-title-latent-font-size
      color input-item-title-latent-color
      transform translate3d(0, -50%, 0)
      transition all .3s ease
      opacity 0
      will-change auto
    .md-field-item-content
      min-height 115px
    .md-field-item-content,
    .md-field-item-left,
    .md-field-item-right,
    .md-input-item-input,
    .md-input-item-fake
      padding-top 20px
    &.is-active
      .md-field-item-title
        opacity 1
        top 20px
        transform translate3d(0, 0, 0)

  &.is-highlight
    &.is-focus
      .md-field-item-content
        hairline(bottom, input-item-color-highlight, 0, 4px)

  &.is-disabled
    .md-input-item-input,
    .md-input-item-fake,
    .md-input-item-fake-placeholder
      -webkit-text-fill-color input-item-color-disabled
      color input-item-color-disabled

  &.is-amount
    .md-input-item-input,
    .md-input-item-fake
      font-family font-family-number
    &.large
      .md-input-item-input,
      .md-fake-input
        padding-top v-gap-xs

  &.large
    .md-input-item-input,
    .md-fake-input
      padding-bottom 15px
      font-size input-item-font-size-large
    .md-input-item-input::-webkit-input-placeholder
        font-size 60px
        line-height 100px

  &.is-error
    .md-field-item-content
      hairline(bottom, input-item-color-error, 0, 4px)

  &.is-ios
    .md-input-item-input::-webkit-input-placeholder
      position relative
      top 3px
      overflow visible
    .md-fake-input::after
      border-right solid 6px #2C6CF5
      border-radius 2px
  &.is-android
    .md-fake-input::after
      border-right solid 4px color-text-base
    .md-input-item-input,
    .md-fake-input
      font-weight input-item-font-weight-android

@-webkit-keyframes keyboard-cursor
  0%
    opacity 1
  50%
    opacity 0
  to
    opacity 1
@keyframes keyboard-cursor
  0%
    opacity 1
  50%
    opacity 0
  to
    opacity 1
</style>