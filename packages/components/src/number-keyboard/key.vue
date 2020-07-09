<template>
  <li
    :class="[active ? 'active' : '', customClass]"
    @click="$_onFocus"
  >
    <span v-text="value"></span>
  </li>
  <!-- <li
    v-else
    :class="[active ? 'active' : '', customClass]"
    @touchmove="$_onBlur"
    @touchend="$_onBlur"
    @touchcancel="$_onBlur"
    @click="$_onFocus"
  >
    <span v-text="value"></span>
  </li> -->
</template>

<script>
export default {
  name: 'md-number-key',

  props: {
    value: {
      type: [String, Number],
      default: '',
    },
    noTouch: {
      type: Boolean,
      default: true,
    },
    noPrevent: {
      type: Boolean,
      default: false,
    },
    customClass: {
      type: String,
      default: ''
    }
  },

  data() {
    return {
      active: false,
    }
  },

  methods: {
    $_onFocus(event) {
      if (!this.noPrevent) {
        event.preventDefault()
        event.stopImmediatePropagation && event.stopImmediatePropagation()
      }
      // if (!this.noTouch) {
      //   this.active = true
      // }
      this.$emit('press', this.value)
    },
    $_onBlur() {
      this.active = false
    },
  },
}
</script>

<style lang="stylus">
// 注： uni-app 中组件嵌套时，在父组件覆盖子组件的样式时，可能导致高度没有被撑开，元素无法点击
.keyboard-number-item
  height number-keyboard-key-height
.keyboard-operate-item
  position relative
  // float left
  width 100%
  background number-keyboard-key-bg
  transition background .3s
  &.delete
    flex 1
    display flex
    align-items center
    justify-content center
    height 214px
    background number-keyboard-key-bg url(@mand-mobile/shared/lib/style/images/keyboard-del.png) center no-repeat
    background-size 42px
    &:active
      background-color number-keyboard-key-bg-tap
  &.confirm
    padding-top 5px
    color number-keyboard-key-confirm-color
    font-size font-caption-large
    background number-keyboard-key-confirm-bg
    display flex
    flex 1
    height 214px
    align-items center
    justify-content center
    &:active
      background-color number-keyboard-key-confirm-bg-tap
.slidedown
  height number-keyboard-key-height
  background number-keyboard-key-bg url(@mand-mobile/shared/lib/style/images/keyboard-hide.png) center no-repeat
  background-size 54px
</style>
