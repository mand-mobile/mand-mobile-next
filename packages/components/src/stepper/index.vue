<template>
<div>
  <div
    class="md-stepper"
    :class="{'md-stepper--disabled': disabled}"
  >
    <div
      class="md-stepper_button md-stepper_button-reduce"
      :class="{'md-stepper_button--disabled': isMin}"
      @click="$_reduce"
    >
    </div>
    <div class="md-stepper_number">
      <div class="md-stepper_number_back">{{currentNum}}</div>
      <!-- 输入框不能绑定value,这样属性不生效,要v-model -->
      <input
        class="md-stepper_number_input"
        :type="inputType"
        :size="contentLength"
        v-model="currentNum"
        :readonly="readOnly"
        :disabled="readOnly"
        @focus="$_onFocus"
        @blur="$_onChange"
        @input="$_onInput"
      />
    </div>
    <div
      class="md-stepper_button md-stepper_button-add"
      :class="{'md-stepper_button--disabled': isMax}"
      @click="$_add"
    >
    </div>
  </div>
  </div>
</template>

<script>
import {warn} from '@mand-mobile/shared/lib/util'
function getDecimalNum(num) {
  try {
    return num.toString().split('.')[1].length
  } catch (e) {
    return 0
  }
}

function accAdd(num1, num2) {
  let r1 = getDecimalNum(num1)
  let r2 = getDecimalNum(num2)
  let m = Math.pow(10, Math.max(r1, r2))
  return +((num1 * m + num2 * m) / m)
}

function subtr(num1, num2) {
  let r1 = getDecimalNum(num1)
  let r2 = getDecimalNum(num2)
  let m = Math.pow(10, Math.max(r1, r2))
  let n = r1 >= r2 ? r1 : r2
  return +((num1 * m - num2 * m) / m).toFixed(n)
}

export default {
  name: 'md-stepper',

  components: {},

  props: {
    defaultValue: {
      type: [Number, String],
      default: 0,
    },
    value: {
      type: [Number, String],
      default: 0,
    },
    step: {
      type: [Number, String],
      default: 1,
    },
    min: {
      type: [Number, String],
      default: -Number.MAX_VALUE,
    },
    max: {
      type: [Number, String],
      default: Number.MAX_VALUE,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    readOnly: {
      type: Boolean,
      default: false,
    },
    isInteger: {
      type: Boolean,
      default: false,
    },
  },

  data() {
    return {
      isMin: false,
      isMax: false,
      isEditing: false,
      currentNum: 0,
      inputType: 'tel',
    }
  },

  computed: {
    contentLength() {
      if (!this.value) {
        return 2
      }
      const length = this.value.toString().length
      return length > 2 ? length : 2
    },
  },

  watch: {
    defaultValue(val) {
      this.currentNum = this.$_getCurrentNum(val)
    },
    value(val) {
      if (this.isEditing) {
        return
      }
      this.currentNum = this.$_getCurrentNum(val)
    },
    min(val) {
      if (this.currentNum < val) {
        this.currentNum = val
      }
      this.$_checkStatus()
    },
    max(val) {
      if (this.currentNum > val) {
        this.currentNum = val
      }
      this.$_checkStatus()
    },
    currentNum(val, oldVal) {
      this.$_checkStatus()

      if (val !== this.value) {
        this.$emit('input', val)
        this.$emit('change', val)
      }

      const diff = val - oldVal

      // judge the event of operation
      if (diff > 0) {
        this.$emit('increase', diff)
      } else if (diff < 0) {
        this.$emit('decrease', Math.abs(diff))
      }
    },
  },

  mounted() {
    // verify that the minimum value is less than the maximum value
    this.$_checkMinMax()
    this.currentNum = this.$_getCurrentNum(this.value || this.defaultValue)
    this.$_checkStatus()
  },

  methods: {
    // MARK: 私有方法
    $_reduce() {
      if (this.disabled || this.isMin) {
        return
      }
      this.currentNum = subtr(this.currentNum, this.step)
      this.$_onChange()
    },
    $_add() {
      if (this.disabled || this.isMax) {
        return
      }
      this.currentNum = accAdd(this.currentNum, this.step)
      this.$_onChange()
    },
    $_formatNum(value) {
      // @elist
      value = String(value).replace(/[^0-9.-]/g, '')
      return value === '' ? 0 : this.isInteger ? Math.floor(value) : +value
    },
    $_getCurrentNum(value) {
      return Math.max(Math.min(this.max, this.$_formatNum(value)), this.min)
    },
    $_checkStatus() {
      this.isMin = this.currentNum <= this.min
      this.isMax = this.currentNum >= this.max
    },
    $_checkMinMax() {
      if (this.min > this.max) {
        warn('[md-vue-stepper] minNum is larger than maxNum')
      }
      return this.max > this.min
    },

    // MARK: 监听事件方法, 如 $_onButtonClick
    $_onInput(event) {
      const {value} = event.target
      const formatted = this.$_formatNum(value)
      if (+value !== formatted) {
        event.target.value = formatted
      }
      this.currentNum = formatted
    },
    $_onFocus() {
      this.isEditing = true
    },
    $_onChange() {
      this.isEditing = false
      this.currentNum = this.$_getCurrentNum(this.currentNum)
    },
  },
}

</script>

<style lang="stylus">
.md-stepper
  color md-stepper-color
  -webkit-font-smoothing antialiased
  font-size md-stepper-font-size
  height md-stepper-height
  display flex
  &--disabled
    .md-stepper_button
      &:before,
      &:after
        opacity md-stepper-disabled-opacity
    input
      opacity md-stepper-disabled-opacity

.md-stepper_button
  position relative
  width md-stepper-width-button
  height md-stepper-height
  background-color md-stepper-fill
  border-radius md-stepper-radius-button
  &:after
    content ""
    position absolute
    width 24px
    height 2px
    top 50%
    left 50%
    background md-stepper-color
    transform translate(-50%, -50%)
  &.md-stepper_button-add
    &:before
      content ""
      position absolute
      width 2px
      height 24px
      top 50%
      left 50%
      background md-stepper-color
      transform translate(-50%, -50%)
  &--disabled
    &:before,
    &:after
      opacity md-stepper-disabled-opacity

.md-stepper_number
  position relative
  margin 0 4px
  min-width md-stepper-width-input
  height md-stepper-height
  padding 0 4px
  text-align center
  border-radius md-stepper-radius-input
  background-color md-stepper-fill
  &_back
    color transparent
  &_input
    position absolute
    left 0
    top 0
    bottom 0
    width 100%
    height md-stepper-height
    border none
    outline none
    font-size md-stepper-input-font-size
    line-height md-stepper-height
    background-color transparent
    box-sizing border-box
    text-align center
    color md-stepper-color
</style>
