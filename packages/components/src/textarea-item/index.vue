<template>
  <md-field-item
    class="md-textarea-item"
    :class="[isDisabled ? 'md-textarea-item--is-disabled' : '', errorInfo ? 'md-textarea-item--is-error' : '']"
    :title="title"
    :solid="solid"
  >
    <textarea
      class="md-textarea-item__textarea"
      ref="textarea"
      v-model="inputValue"
      :disabled="isDisabled || readonly"
      :maxlength="maxLength"
      :placeholder="placeholder"
      :rows="rows"
      :auto-height="autosize"
      :focus="isInputFocus"
      @input="$_onInput"
      @focus="$_onFocus"
      @blur="$_onBlur"
      @keyup="$_onKeyup"
      @keydown="$_onKeydown"
    ></textarea>
    <slot name="footer"></slot>
    <template slot="right">
      <div
        class="md-textarea-item__clear"
        v-if="clearable && !isDisabled && !readonly"
        v-show="!isInputEmpty && isInputFocus"
        @click="$_clearInput"
      >
        <md-icon name="clear"></md-icon>
      </div>
      <slot name="right"></slot>
    </template>
    <template slot="children">
      <div v-if="errorInfo" class="md-textarea-item-msg">
        <p>{{ errorInfo }}</p>
      </div>
    </template>
  </md-field-item>
</template>
<script>
import MdFieldItem from '../field/item'
import MdIcon from '../icon'
export default {
  name: 'md-textarea-item',
  components: {
    'md-field-item': MdFieldItem,
    'md-icon': MdIcon,
  },
  props: {
    title: {
      type: String,
      default: '',
    },
    placeholder: {
      type: String,
      default: '',
    },
    value: {
      type: String,
      default: '',
    },
    maxLength: {
      type: [String, Number],
      default: -1,
    },
    maxHeight: {
      type: [String, Number],
      default: '',
    },
    solid: {
      type: Boolean,
      default: true,
    },
    readonly: {
      type: Boolean,
      default: false,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    clearable: {
      type: Boolean,
      default: false,
    },
    rows: {
      type: [String, Number],
      default: '3',
    },
    autosize: {
      type: Boolean,
      default: false,
    },
    error: {
      type: String,
      defalut: '',
    },
  },
  data() {
    return {
      maxHeightInner: this.maxHeight,
      inputValue: this.value,
      isInputFocus: false,
    }
  },
  computed: {
    isDisabled() {
      return this.disabled
    },
    errorInfo() {
      return this.error
    },
    isInputEmpty() {
      return !this.inputValue.length
    },
  },
  watch: {
    value(val) {
      this.inputValue = val
      this.$nextTick(() => {
        this.resizeTextarea()
      })
    },
    inputValue(val) {
      this.$emit('input', val)
      this.$emit('change', val)
    },
    maxHeight(val) {
      this.maxHeightInner = val
      this.resizeTextarea()
    },
  },
  mounted() {
    this.resizeTextarea()
  },
  methods: {
    $_onInput(event) {
      this.inputValue = event.target.value
      this.$nextTick(() => {
        this.resizeTextarea()
      })
    },
    $_clearInput() {
      this.inputValue = ''
      this.$nextTick(() => {
        this.resizeTextarea()
      })
      this.focus()
    },
    $_onKeyup(event) {
      this.$emit('keyup', event)
    },
    $_onKeydown(event) {
      this.$emit('keydown', event)
    },
    $_onFocus() {
      this.isInputFocus = true
      this.$emit('focus')
    },
    $_onBlur() {
      setTimeout(() => {
        this.isInputFocus = false
        this.$emit('blur')
      }, 100)
    },
    $_calcTextareaHeight(textarea = {}) {
      // 计算高宽放到textarea里面了, 并且没法获取实际高度, 并且没法获得ref
      // console.log(this.$refs);
      // Triggers the textarea to repaint
      textarea.style.height = 'auto'

      let scrollHeight = textarea.scrollHeight
      // if textarea-item is not displayed, avoid height calculations
      if (scrollHeight === 0) {
        return
      }

      if (this.maxHeightInner && scrollHeight > this.maxHeightInner) {
        scrollHeight = this.maxHeightInner
      }

      textarea.style.height = scrollHeight + 'px'
    },
    // public
    resizeTextarea() {
      if (this.autosize) {
        this.$_calcTextareaHeight(this.$refs.textarea)
      }
    },
    focus() {
      setTimeout(() => {
        this.isInputFocus = true
      }, 200)
    },
    blur() {
      this.$refs.textarea.blur()
      this.isInputFocus = false
    },
    getValue() {
      return this.inputValue
    },
  },
}

</script>
<style lang="stylus">
.md-textarea-item
  &-msg
    color md-textarea-item-color-error
  .md-field-item_content
    align-items normal
  &.md-textarea-item--is-disabled
    .md-textarea-item__textarea
      // -webkit-text-fill-color textarea-item-color-disabled
      color md-textarea-item-color-disabled
  .md-field-item_right
    align-items start
  &__clear
    padding 6px 0
    color md-textarea-item-icon
    .md-icon
      display flex
  &__textarea
    width 100%
    line-height md-textarea-item-line-height
    color md-textarea-item-color
    font md-textarea-item-font-weight md-textarea-item-font-size md-font-family-normal
    background transparent
    text-align left
    border none
    outline none
    resize none
    appearance none
    box-sizing border-box
    -webkit-tap-highlight-color transparent
    &::-webkit-input-placeholder
      color md-textarea-item-placeholder-color
      font-weight md-textarea-item-placeholder-weight
  &.md-textarea-item--is-error
    .md-field-item_content
      hairline(bottom, md-textarea-item-color-error, 0, 4px)
</style>
