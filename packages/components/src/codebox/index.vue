<template>
  <div class="md-codebox-wrapper">
    <div
      class="md-codebox"
      :class="[
        disabled ? 'md-is-disabled' : '',
        justify ? 'md-is-justify': '',
      ]"
      @click="focus"
    >
      <template v-if="maxlength > 0">
        <span
          v-for="(item, index) in innerNumMap"
          :key="index"
          :class="[
            'md-codebox_box',
            item.isActive ? 'is-active' : '',
            item.isFilled ? 'is-filled' : '',
          ]"
        >
          <template v-if="item.showVal">
            <template v-if="mask">
              <i class="md-codebox_dot"></i>
            </template>
            <template v-else>
              {{item.showVal}}
            </template>
          </template>
          <template v-if="item.isActive">
            <i class="md-codebox_blink"></i>
          </template>
        </span>
      </template>
      <template v-else>
        <input
          v-if="mask"
          type="password"
          :maxlength="maxlength"
          :value="code"
          readonly
          disabled
          :class="['md-codebox_holder', focused && 'md-is-active']"
        />
        <input
          v-else
          type="text"
          :maxlength="maxlength"
          :value="code"
          readonly
          disabled
          :class="['md-codebox_holder', focused && 'md-is-active']"
        />
      </template>
    </div>
    <slot></slot>
    <form ref="form" action="" v-if="system" @submit="$_onSubmit">
      <input
        :value="code"
        :type="mask ? 'password' : inputType"
        :maxlength="maxlength"
        :focus="focused"
        @input="$_onInputChange"
        @blur="blur"
        ref="input"
        class="md-codebox_input"
      />
    </form>
    <md-number-keyboard
      v-if="!system"
      ref="keyboard"
      class="md-codebox_keyboard"
      :type="maxlength > 0 ? 'simple' : 'professional'"
      :okText="okText"
      :disorder="disorder"
      :is-view="isView"
      v-model="focused"
      @delete="$_onDelete"
      @enter="$_onEnter"
      @confirm="$_onConfirm"
    ></md-number-keyboard>
  </div>
</template>

<script>import {inBrowser} from '@mand-mobile/shared/lib/util/env'
import NumberKeyboard from '../number-keyboard'

export default {
  name: 'md-codebox',
  components: {
    'md-number-keyboard': NumberKeyboard,
  },
  props: {
    value: {
      type: String,
      default: '',
    },
    maxlength: {
      type: [Number, String],
      default: 4,
    },
    autofocus: {
      type: Boolean,
      default: false,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    justify: {
      type: Boolean,
      default: false,
    },
    mask: {
      type: Boolean,
      default: false,
    },
    closable: {
      type: Boolean,
      default: true,
    },
    system: {
      type: Boolean,
      default: false,
    },
    okText: {
      type: String,
      default: '确定',
    },
    disorder: {
      type: Boolean,
      default: false,
    },
    isView: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      code: '',
      focused: this.autofocus,
    }
  },
  watch: {
    value: {
      immediate: true,
      handler(val) {
        if (val !== this.code) {
          this.code = val
        }
      },
    },
  },
  computed: {
    num() {
      return Math.abs(parseInt(this.maxlength, 10)) || 1
    },
    innerNumMap() {
      const _arr = []
      for (let i = 0; i < this.num; i++) {
        _arr.push(i + 1)
      }
      return _arr.map(k => ({
        i: k,
        isActive: this.focused && this.code.length + 1 === k,
        isFilled: this.code.charAt(k - 1) !== '',
        showVal: this.code.charAt(k - 1),
      }))
    },
    inputType() {
      if (inBrowser) {
        return 'tel'
      } else {
        return 'number'
      }
    },
  },
  mounted() {
    if (this.closable && document) {
      document.addEventListener('click', this.$_handleOutClick)
    }
    if (!this.system && !this.isView && document) {
      document.body.appendChild(this.$refs.keyboard.$el)
    }
    this.$nextTick(() => {
      this.focused = this.autofocus
    })
  },
  beforeDestroy() {
    if (this.closable && document) {
      document.removeEventListener('click', this.$_handleOutClick)
    }
    if (this.focused) {
      this.blur()
    }
    if (!this.system && !this.isView && document) {
      document.body.removeChild(this.$refs.keyboard.$el)
    }
  },
  methods: {
    // MARK: private methods

    // MARK: events handler
    $_handleOutClick(e) {
      if (inBrowser && !this.$el.contains(e.target)) {
        this.focused = false
      }
    },
    $_onInputChange(e) {
      if (this.maxlength < 0 || e.target.value.length <= this.maxlength) {
        this.code = e.target.value
      }

      if (this.code.length === this.maxlength) {
        this.$emit('submit', this.code)
        this.focused = false
      }

      this.$emit('input', this.code)
    },
    $_onSubmit(e) {
      e.preventDefault()
      this.$emit('submit', this.code)
    },
    $_onEnter(val) {
      if ((this.maxlength < 0 || this.code.length < this.maxlength) && val !== '.') {
        this.code += val
      }

      if (this.code.length === this.maxlength) {
        this.$nextTick(function() {
          this.$emit('submit', this.code)
          this.focused = false
        })
      }

      this.$emit('input', this.code)
    },
    $_onDelete() {
      this.code = this.code.slice(0, this.code.length - 1)
      this.$emit('input', this.code)
    },
    $_onConfirm() {
      this.$emit('submit', this.code)
    },
    // MARK: public methods
    blur() {
      this.focused = false
      if (this.system && this.$refs.input) {
        if (typeof this.$refs.input.blur === 'function') {
          this.$refs.input.blur()
        } else {
          this.$refs.input.$refs.input.blur()
        }
      }
    },
    focus() {
      if (this.disabled) {
        return
      }

      this.focused = true
      if (this.system && this.$refs.input) {
        if (typeof this.$refs.input.focus === 'function') {
          this.$refs.input.focus()
        } else {
          this.$refs.input.$refs.input.focus()
        }
      }
    },
  },
}
</script>

<style lang="stylus">
.md-codebox-wrapper
  .md-codebox_input
    position absolute
    // border-bottom 1px solid red
    left -9999px
    opacity 0

.md-codebox
  position relative
  display flex
  flex-wrap nowrap
  justify-content center
  &.md-is-justify
    .md-codebox_box
      flex 1 1 0%

.md-codebox_box
  position relative
  flex 0 1 md-codebox-width
  width md-codebox-width
  height md-codebox-height
  display flex
  align-items center
  justify-content center
  color md-codebox-color
  font-family md-font-family-number
  font-size md-codebox-font-size
  font-weight normal
  line-height 1.2
  if codebox-gutter is a 'unit'
    margin-left (md-codebox-gutter / 2)
    margin-right (md-codebox-gutter / 2)
  else
    margin-left "calc(%s / 2)" % md-codebox-gutter
    margin-right "calc(%s / 2)" % md-codebox-gutter

  hairline(bottom, md-color-border-element)
  &:first-child
    margin-left 0
  &:last-child
    margin-right 0
  &.md-is-active, &.md-is-filled
    border-color md-codebox-border-active-color

.md-codebox_blink
  display block
  if tab-height is a 'unit'
    height (md-codebox-height * 0.8)
  else
    height "calc(%s * 0.8)" % md-codebox-height
  width 2px
  background-color md-codebox-blink-color
  animation md-codebox-flash steps(2) 1s infinite

.md-codebox_dot
  display block
  height 10px
  width 10px
  border-radius 5px
  background-color md-codebox-dot-color

.md-codebox_holder
  pointer-events none
  height md-codebox-height
  line-height md-codebox-height
  padding 0 md-codebox-holder-space
  width 100%
  text-align center
  font-size md-codebox-font-size
  outline none
  color md-codebox-color
  letter-spacing 0.1em
  border-radius 0
  border-style solid
  border-width 0 0 md-codebox-border-width 0
  border-color md-codebox-border-color
  background none
  box-shadow none
  box-sizing border-box
  -webkit-appearance none
  -webkit-text-fill-color md-codebox-color
  &[disabled],
  &[readonly]
    opacity 1
    color md-codebox-color
    border-color md-codebox-border-color
  &.md-is-active
    border-color md-codebox-border-active-color

.md-codebox.md-is-disabled
  .md-codebox_box
    color md-codebox-disabled-color
    border-color md-codebox-disabled-color
  .md-codebox_blink
    display none
  .md-codebox_dot
    background-color md-codebox-disabled-color
  .md-codebox_holder
    color md-codebox-disabled-color
    border-color md-codebox-disabled-color

@keyframes md-codebox-flash
  from
    opacity 0
  to
    opacity 1
</style>

