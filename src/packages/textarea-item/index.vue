<template>
  <md-field-item
    class="md-textarea-item"
    :class="[
      isDisabled ? 'is-disabled' : '',
      errorInfo ? 'is-error' : '',
    ]"
    :title="title"
    :solid="solid"
  >
    <textarea
      ref="textarea"
      v-model="inputValue"
      class="md-textarea-item__textarea"
      :disabled="isDisabled"
      :readonly="readonly"
      :maxlength="maxLength"
      :placeholder="placeholder"
      :rows="rows"
      @input="onInput"
      @focus="onFocus"
      @blur="onBlur"
      @keyup="onKeyup"
      @keydown="onKeydown"
    ></textarea>
    <slot name="footer"></slot>
    <template #right>
      <div
        v-if="clearable && !isDisabled && !readonly"
        v-show="!isInputEmpty && isInputFocus"
        class="md-textarea-item__clear"
        @click="clearInput"
      >
        <md-icon name="clear"></md-icon>
      </div>
      <slot name="right"></slot>
    </template>
    <template #children>
      <div v-if="errorInfo" class="md-textarea-item-msg">
        <p>{{ errorInfo }}</p>
      </div>
    </template>
  </md-field-item>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import FieldItem from 'mand-mobile/field-item'
import Icon from 'mand-mobile/icon'
import {
  textareaItemProps as props,
  emits,
  useTextareaItem,
} from './use-textarea-item'
export default defineComponent({
  name: 'MdTextareaItem',
  components: {
    MdFieldItem: FieldItem,
    MdIcon: Icon,
  },
  props,
  emits,
  setup(props, context) {
    const {
      inputValue,
      isDisabled,
      errorInfo,
      isInputEmpty,

      onInput,
      clearInput,

      onFocus,
      onBlur,
      isInputFocus,

      onKeyup,
      onKeydown,

      textarea,
    } = useTextareaItem(props, context)
    return {
      inputValue,
      isDisabled,
      errorInfo,
      isInputEmpty,

      onInput,
      clearInput,

      onFocus,
      onBlur,
      isInputFocus,

      onKeyup,
      onKeydown,

      textarea,
    }
  },
})
</script>

<style lang="stylus">
.md-textarea-item
  &-msg
    color textarea-item-color-error
  .md-field-item-content
    align-items normal
  &.is-disabled
    .md-textarea-item__textarea
      -webkit-text-fill-color textarea-item-color-disabled
      color textarea-item-color-disabled
  .md-field-item-right
    align-items start
  &__clear
    padding 6px 0
    color textarea-item-icon
    .md-icon
      display flex
  &__textarea
    box-sizing border-box
    width 100%
    font textarea-item-font-weight textarea-item-font-size font-family-normal
    line-height textarea-item-line-height
    color textarea-item-color
    background transparent
    border none
    outline none
    resize none
    appearance none
    -webkit-tap-highlight-color transparent
    &::-webkit-input-placeholder
      color textarea-item-placeholder-color
      font-weight textarea-item-placeholder-weight
  &.is-error
    .md-field-item-content
      hairline(bottom, textarea-item-color-error, 0, 4px)
</style>
