<template>
  <md-field-item
    class="md-input-item md-field-item"
    :class="[
      isTitleLatent ? 'md-title-latent' : '',
      isHighlight ? 'md-highlight' : '',
      isInputActive ? 'md-active' : '',
      isInputFocus ? 'md-focus' : '',
      isInputError ? 'md-error' : '',
      isInputBrief && !isInputError ? 'md-with-brief' : '',
      isDisabled ? 'md-disabled': '',
      isAmount ? 'md-amount': '',
      clearable ? 'md-clear' : '',
      `md-${align}`,
      `md-${size}`,
    ]"
    :title="title"
    :title-position="inputTitlePosition"
    :solid="solid && !isTitleLatent"
    :highlight="inputHighlight"
    :children-slots="inputSlots"
    :is-padding="false"
  >
    <template #left>
      <slot name="left"/>
    </template>
    <!-- ------------ -->
    <!--    INPUT     -->
    <!-- ------------ -->
    <!-- Native Input -->
    <div class="md-input-item_mask" v-if="readonly"/>
    <template v-if="!isVirtualKeyboard">
      <input
        class="md-input-item_input"
        placeholder-class="md-input-item_placeholder"
        ref="input"
        :type="inputType"
        :name="name"
        v-model="inputBindValue"
        :placeholder="inputPlaceholder"
        :disabled="isDisabled"
        :readonly="readonly"
        :maxlength="isInputFormative ? inputItemMaxLength : maxlength"
        :focus="isInputFocus"
        autocomplete="off"
        @focus="$_onFocus"
        @blur="$_onBlur"
        @keyup="$_onKeyup"
        @keydown="$_onKeydown"
        @input="$_onInput"
      />
    </template>
    <!-- Fake Input -->
    <template v-else>
      <div
        class="md-input-item_fake"
        :class="[
          isInputFocus ? 'md-focus' : '',
          !isInputEditing ? 'md-waiting' : '',
          isDisabled ? 'md-disabled' : '',
          readonly ? 'md-readonly' : '',
        ]"
        @click="$_onFakeInputClick"
      >
        <span v-text="inputValue"></span>
        <span
          class="md-input-item_fake-placeholder"
          v-if="inputValue === '' && inputPlaceholder !== ''"
          v-text="inputPlaceholder"></span>
      </div>
    </template>

    <template #right>
      <!-- ------------ -->
      <!--  CLEART BTN  -->
      <!-- ------------ -->
      <div
        class="md-input-item_clear"
        v-if="clearable && !isDisabled && !readonly"
        v-show="!isInputEmpty && isInputFocus"
        @click="$_clearInput"
      >
        <md-icon name="clear"></md-icon>
      </div>

      <!-- ------------ -->
      <!--  RIGHT SLOT  -->
      <!-- ------------ -->
      <slot name="right"/>
    </template>

    <template #children>
      <!-- -------------------- -->
      <!-- BRIEF/ERROR TIP -->
      <!-- -------------------- -->
      <div
        v-if="isInputError"
        class="md-input-item_msg"
      >
        <!-- <p v-if="error !== ''" v-text="error"></p>
        <slot name="error" v-else></slot> -->
        <slot name="error">
          <p>{{error}}</p>
        </slot>
      </div>
      <div
        v-if="isInputBrief && !isInputError"
        class="md-input-item_brief"
      >
        <!-- <p v-if="brief !== ''" v-text="brief"></p>
        <slot name="brief" v-else></slot> -->
        <slot name="brief">
          <p>{{brief}}</p>
        </slot>
      </div>
      <!-- ------------ -->
      <!--   KEYBORARD  -->
      <!-- ------------ -->
      <md-number-keyboard
        v-if="isVirtualKeyboard && !virtualKeyboardVm"
        v-model="isInputFocus"
        ref="number-keyboard"
        custom-class="md-input-item_number-keyboard"
        :data-id="`${name}-number-keyboard`"
        :ok-text="virtualKeyboardOkText"
        :disorder="virtualKeyboardDisorder"
      ></md-number-keyboard>
    </template>
  </md-field-item>
</template>

<script>
import {
  noop,
  randomId,
  debounce,
  inBrowser,
  formatValueByGapRule,
  formatValueByGapStep,
  trimValue,
  mdDocument,
} from '@mand-mobile/shared/lib/util'

import Icon from '../icon'
import FieldItem from '../field/item.vue'
import NumberKeyboard from '../number-keyboard'
import {getCursorsPosition, setCursorsPosition} from './cursor'

export default {
  name: 'md-input-item',

  components: {
    'md-icon': Icon,
    'md-field-item': FieldItem,
    'md-number-keyboard': NumberKeyboard,
  },

  inject: {
    rootField: {
      from: 'rootField',
      default: () => ({}),
    },
  },

  props: {
    type: {
      // text, bankCard, password, phone, money, digit
      type: String,
      default: 'text',
    },
    previewType: {
      type: String,
      default: '',
    },
    name: {
      type: [String, Number],
      default() {
        return randomId('input-item')
      },
    },
    title: {
      type: String,
      default: '',
    },
    brief: {
      type: String,
      default: '',
    },
    value: {
      type: [String, Number],
      default: '',
    },
    placeholder: {
      type: String,
      default: '',
    },
    maxlength: {
      type: [String, Number],
      default: 140,
    },
    size: {
      // large, normal
      type: String,
      default: 'normal',
    },
    align: {
      // left, center, right
      type: String,
      default: 'left',
    },
    error: {
      type: String,
      default: '',
    },
    readonly: {
      type: Boolean,
      default: false,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    solid: {
      type: Boolean,
      default: true,
    },
    clearable: {
      type: Boolean,
      default: false,
    },
    isVirtualKeyboard: {
      type: Boolean,
      default: false,
    },
    virtualKeyboardDisorder: {
      type: Boolean,
      default: false,
    },
    virtualKeyboardOkText: {
      type: String,
      default: '确定',
    },
    virtualKeyboardVm: {
      type: [Object, String],
      default: null,
    },
    isTitleLatent: {
      type: Boolean,
      default: false,
    },
    isFormative: {
      type: Boolean,
      default: false,
    },
    isHighlight: {
      type: Boolean,
      default: false,
    },
    isAmount: {
      type: Boolean,
      default: false,
    },
    formation: {
      type: Function,
      default: noop,
    },
  },

  data() {
    return {
      inputValue: '',
      inputBindValue: '',
      inputNumberKeyboard: '',
      isInputFocus: false,
      isInputEditing: false,
      isPreview: false,
    }
  },

  computed: {
    inputItemType() {
      return (this.isPreview ? this.previewType : this.type) || 'text'
    },
    inputType() {
      let inputType = this.inputItemType || 'text'
      if (inputType === 'bankCard' || inputType === 'phone' || inputType === 'digit') {
        inputType = inBrowser ? 'tel' : 'digit'
      } else if (inputType === 'money') {
        inputType = 'text'
      }
      return inputType
    },
    inputMaxLength() {
      if (this.inputItemType === 'phone') {
        return 11
      } else {
        return this.maxlength
      }
    },
    inputItemMaxLength() {
      if (inBrowser) {
        return ''
      } else {
        return 200
      }
    },
    inputTitlePosition() {
      return this.isTitleLatent ? (this.isInputActive ? 'floating-active' : 'floating') : 'fixed'
    },
    inputHighlight() {
      if (this.isInputFocus && this.isHighlight) {
        return 'default'
      } else if (this.isInputError) {
        return 'warning'
      } else {
        return ''
      }
    },
    inputPlaceholder() {
      return this.isTitleLatent && this.isInputActive ? '' : this.placeholder
    },
    inputSlots: {
      get() {
        return {
          left: this.$slots.left,
          children: this.isInputError || this.isInputBrief,
        }
      },
      cache: false,
    },
    isInputActive() {
      return !this.isInputEmpty || this.isInputFocus
    },
    isInputEmpty() {
      return !this.inputValue.length
    },
    isInputFormative() {
      const type = this.inputItemType
      return this.isFormative || (type === 'bankCard' || type === 'phone' || type === 'money' || type === 'digit')
    },
    isDisabled() {
      return this.rootField.disabled || this.disabled
    },
    isInputError: {
      get() {
        return this.$slots.error || this.error !== ''
      },
      cache: false,
    },
    isInputBrief: {
      get() {
        return this.$slots.brief || this.brief !== ''
      },
      cache: false,
    },
  },

  watch: {
    value(val) {
      // Filter out two-way binding
      if (val !== this.$_trimValue(this.inputValue)) {
        this.inputValue = this.$_formateValue(this.$_subValue(val + '')).value
      }
    },
    previewType: {
      handler(val) {
        this.isPreview = !!val
      },
      immediate: true,
    },
    inputValue(val) {
      this.inputBindValue = val
      val = this.isInputFormative ? this.$_trimValue(val) : val
      if (val !== this.value) {
        this.$emit('input', val)
        this.$emit('change', this.name, val)
      }
    },
    isInputFocus(val) {
      if (!this.isVirtualKeyboard || !this.inputNumberKeyboard) {
        return
      }
      if (val) {
        this.inputNumberKeyboard.show()
        this.$emit('focus', this.name)
      } else {
        this.inputNumberKeyboard.hide()
        this.$emit('blur', this.name)
      }
    },
  },
  created() {
    this.inputValue = this.$_formateValue(this.$_subValue(this.value + '')).value
  },
  mounted() {
    // if (inBrowser && this.isVirtualKeyboard) {
    //   this.$nextTick(() => {
    //     this.$_initNumberKeyBoard()
    //   })
    // } else if (!inBrowser && this.isVirtualKeyboard) {
    //   if (this.$refs['number-keyboard']) {
    //     this.$refs['number-keyboard'].$on('enter', this.$_onNumberKeyBoardEnter)
    //     this.$refs['number-keyboard'].$on('delete', this.$_onNumberKeyBoardDelete)
    //     this.$refs['number-keyboard'].$on('confirm', this.$_onNumberKeyBoardConfirm)
    //   }
    // }
    if (this.isVirtualKeyboard) {
      this.$nextTick(() => {
        this.$_initNumberKeyBoard()
      })
    }
  },
  beforeDestroy() {
    const keyboard = this.inputNumberKeyboard
    if (keyboard && keyboard.$el) {
      mdDocument.body.removeChild(keyboard.$el)
    }
  },

  methods: {
    // MARK: private methods
    $_formateValue(curValue, curPos = 0) {
      const type = this.inputItemType
      const name = this.name
      const oldValue = this.inputValue
      const isAdd = oldValue.length > curValue.length ? -1 : 1

      let formateValue = {value: curValue, range: curPos}

      // no format
      if (!this.isInputFormative || curValue === '') {
        return formateValue
      }

      // custom format by user
      const customValue = this.formation && this.formation(name, curValue, curPos)

      if (customValue) {
        return customValue
      }

      // default format by component
      let gap = ' '
      switch (type) {
        case 'bankCard':
          curValue = this.$_subValue(trimValue(curValue.replace(/\D/g, '')))
          formateValue = formatValueByGapStep(4, curValue, gap, 'left', curPos, isAdd, oldValue)
          break
        case 'phone':
          curValue = this.$_subValue(trimValue(curValue.replace(/\D/g, '')))
          formateValue = formatValueByGapRule('3|4|4', curValue, gap, curPos, isAdd)
          break
        case 'money':
          gap = ','
          curValue = this.$_subValue(trimValue(curValue.replace(/[^\d.]/g, '')))
          // curValue = curValue.replace(/\D/g, '')
          const dotPos = curValue.indexOf('.')
          // format if no dot or new add dot or insert befor dot
          const moneyCurValue = curValue.split('.')[0]
          const moneyCurDecimal = ~dotPos ? `.${curValue.split('.')[1]}` : ''

          formateValue = formatValueByGapStep(
            3,
            trimValue(moneyCurValue, gap),
            gap,
            'right',
            curPos,
            isAdd,
            oldValue.split('.')[0],
          )
          formateValue.value += moneyCurDecimal
          break
        case 'digit':
          curValue = this.$_subValue(trimValue(curValue.replace(/[^\d.]/g, '')))
          formateValue.value = curValue
          break
        /* istanbul ignore next */
        default:
          break
      }

      return formateValue
    },
    $_trimValue(val) {
      return trimValue(val, '\\s|,')
    },
    $_subValue(val) {
      const len = this.inputMaxLength
      if (len !== '') {
        return val.substring(0, len)
      } else {
        return val
      }
    },
    $_startEditInput() {
      this.isInputEditing = true
      this.$_stopEditInput()
    },
    $_stopEditInput: debounce(function() {
      this.isInputEditing = false
    }, 500),
    $_clearInput() {
      this.inputValue = ''
      if (!this.isTitleLatent) {
        this.focus()
      }
      this.isPreview = false
    },
    $_stopPreview() {
      this.$_clearInput()
      this.$emit('update:previewType', '')
    },
    $_focusFakeInput() {
      this.isInputFocus = true
      setTimeout(() => {
        this.$_addBlurListener()
      }, 0)
    },
    $_blurFakeInput() {
      this.isInputFocus = false
      this.$_removeBlurListener()
    },
    $_addBlurListener() {
      mdDocument.addEventListener('click', this.$_blurFakeInput, false)
    },
    $_removeBlurListener() {
      mdDocument.removeEventListener('click', this.$_blurFakeInput, false)
    },
    $_initNumberKeyBoard() {
      let keyboard =
        this.virtualKeyboardVm && typeof this.virtualKeyboardVm === 'object'
          ? this.virtualKeyboardVm
          : (this.$vnode ? this.$vnode.context.$refs[this.virtualKeyboardVm] : '') || this.$refs['number-keyboard']

      if (Array.isArray(keyboard)) {
        keyboard = keyboard[0]
      }
      if (keyboard) {
        keyboard.$on('enter', this.$_onNumberKeyBoardEnter)
        keyboard.$on('delete', this.$_onNumberKeyBoardDelete)
        keyboard.$on('confirm', this.$_onNumberKeyBoardConfirm)

        const {$el, show, hide} = keyboard
        mdDocument.body.appendChild($el)
        this.inputNumberKeyboard = {show, hide}
      }
    },

    // MARK: events handler
    $_onInput(event) {
      const formateValue = this.$_formateValue(
        event.target.value,
        this.isInputFormative ? getCursorsPosition(event.target) : 0,
      )

      // this.inputValue = formateValue.value
      // this.inputBindValue = formateValue.value

      // if (this.isInputFormative) {
      //   this.$nextTick(() => {
      //     setCursorsPosition(event.target, formateValue.range)
      //   })
      // }
      this.$nextTick(() => {
        this.inputValue = formateValue.value
        this.inputBindValue = formateValue.value

        if (this.isInputFormative) {
          setCursorsPosition(event.target, formateValue.range)
        }
      })
    },
    $_onKeyup(event) {
      this.$emit('keyup', this.name, event)
      if (+event.keyCode === 13 || +event.keyCode === 108) {
        this.$emit('confirm', this.name, this.inputValue)
      }
    },
    $_onKeydown(event) {
      this.$emit('keydown', this.name, event)
      if (!(+event.keyCode === 13 || +event.keyCode === 108)) {
        this.$_startEditInput()
        if (this.isPreview) {
          this.$_stopPreview()
        }
      }
    },
    $_onFocus() {
      this.isInputFocus = true
      this.$emit('focus', this.name)
    },
    $_onBlur() {
      setTimeout(() => {
        this.isInputFocus = false
        this.$emit('blur', this.name)
      }, 100)
    },
    $_onFakeInputClick(event) {
      if (this.isDisabled || this.readonly) {
        return
      }

      this.$_blurFakeInput()

      if (!this.isInputFocus) {
        this.$_focusFakeInput(event)
      }
    },
    $_onNumberKeyBoardEnter(val) {
      if (this.isPreview) {
        this.$_stopPreview()
      }
      if (this.inputMaxLength > 0 && this.$_trimValue(this.inputValue).length >= this.inputMaxLength) {
        return
      }
      this.inputValue = this.$_formateValue(this.inputValue + val).value
      this.$_startEditInput()
    },
    $_onNumberKeyBoardDelete() {
      const inputValue = this.inputValue
      if (inputValue === '') {
        return
      }
      this.inputValue = this.$_formateValue(inputValue.substring(0, inputValue.length - 1)).value
      this.$_startEditInput()
      if (this.isPreview) {
        this.$_stopPreview()
      }
    },
    $_onNumberKeyBoardConfirm() {
      this.$emit('confirm', this.name, this.inputValue)
    },

    // MARK: public methods
    focus() {
      if (this.isVirtualKeyboard) {
        this.$_onFakeInputClick()
      } else {
        if (this.$refs.input) {
          this.$refs.input.focus()
        }
        setTimeout(() => {
          this.isInputFocus = true
        }, 200)
      }
    },
    blur() {
      if (this.isVirtualKeyboard) {
        this.$_blurFakeInput()
      } else {
        if (this.$refs.input) {
          this.$refs.input.blur()
        }
        this.isInputFocus = false
      }
    },
    getValue() {
      return this.inputValue
    },
  },
}

</script>

<style lang="stylus">
.md-input-item.md-title-latent
  .md-input-item_input,
  .md-input-item_fake
    padding-top 20px
// .md-input-item  
//   .md-field-item_content_control
//     display flex
//     align-items center
.md-input-item_mask
  position absolute
  width 100%
  height 100%
  z-index 10
.md-input-item_clear
  padding 10px 0
  color md-input-item-icon
  .md-icon
    display flex
    background md-color-bg-base
    border-radius md-radius-circle

.md-input-item_input,
.md-input-item_fake
  // display flex
  width 100%
  height md-input-item-height
  color md-input-item-color
  font-size md-input-item-font-size
  font-weight md-input-item-font-weight
  font-family md-font-family-normal
  line-height 1
  -webkit-appearance none
  border none
  background transparent
  outline none
  box-sizing border-box
  -webkit-tap-highlight-color transparent
  appearance none

.md-input-item_input
  &:disabled, &[disabled]
    opacity 1
  &::-webkit-input-placeholder
    color md-input-item-placeholder
    font-weight md-font-weight-normal
  &::-webkit-outer-spin-button, &::-webkit-inner-spin-button
    -webkit-appearance none
.md-input-item_placeholder
  color md-input-item-placeholder
  font-weight md-font-weight-normal

.md-input-item_fake
  line-height md-input-item-height
  word-ellipsis()
  cursor text
  &::after
    position relative
    z-index 2
    display none
    content " "
    height md-input-item-font-size-large
    border-right solid 2px md-color-text-base
  &.md-focus::after
    display inline
  &.md-waiting::after
    animation keyboard-cursor infinite 1s step-start

.md-input-item_fake-placeholder
  position absolute
  top 0
  left 0
  width 100%
  color md-input-item-placeholder
  font-weight md-font-weight-normal

.md-input-item_msg,
.md-input-item_brief
  word-break()
  &:not(:last-child)
    margin-bottom 10px

.md-input-item_brief
  font-size md-input-item-font-size-brief
  color md-input-item-color-brief

.md-input-item_msg
  font-size md-input-item-font-size-error
  color md-input-item-color-error

.md-input-item
  &.md-left
    .md-input-item_input,
    .md-input-item_fake
      text-align left

  &.md-center
    .md-input-item_input,
    .md-input-item_fake
      text-align center !important

  &.md-right
    .md-input-item_input,
    .md-input-item_fake
      text-align right

  &.md-disabled
    .md-input-item_input,
    .md-input-item_fake,
    .md-input-item_fake-placeholder
      -webkit-text-fill-color md-input-item-color-disabled
      color md-input-item-color-disabled

  &.md-amount
    .md-input-item_input,
    .md-input-item_fake
      font-family md-font-family-number
    &.md-large
      .md-input-item_input,
      .md-input-item_fake
        padding-top md-v-gap-xs

  &.md-large
    .md-input-item_input,
    .md-input-item_fake
      padding-bottom 15px
      font-size md-input-item-font-size-large
    .md-input-item_input::-webkit-input-placeholder, .md-input-item_placeholder
      font-size 60px
      line-height 100px

  &.md-field-item--ios
    .md-input-item_input::-webkit-input-placeholder
      position relative
      top 3px
      overflow visible
    .md-input-item_fake::after
      border-right solid 6px #2C6CF5
      border-radius 2px
  &.md-field-item--android
    .md-input-item_fake::after
      border-right solid 4px md-color-text-base
    .md-input-item_input,
    .md-input-item_fake
      font-weight md-input-item-font-weight-android

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
