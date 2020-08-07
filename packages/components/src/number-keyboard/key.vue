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

<script>export default {
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
      default: '',
    },
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
        if (event.stopImmediatePropagation) {
          event.stopImmediatePropagation()
        }
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
.keyboard-number_item
  height md-number-keyboard-key-height
.keyboard-operate_item
  position relative
  // float left
  width 100%
  background md-number-keyboard-key-bg
  transition background .3s
  &.md-delete
    flex 1
    display flex
    align-items center
    justify-content center
    height 214px
    background md-number-keyboard-key-bg url(assets/images/keyboard-del.png) center no-repeat
    background-size 42px
    &:active
      background-color md-number-keyboard-key-bg-tap
  &.md-confirm
    padding-top 5px
    color md-number-keyboard-key-confirm-color
    font-size md-font-caption-large
    background md-number-keyboard-key-confirm-bg
    display flex
    flex 1
    height 214px
    align-items center
    justify-content center
    &:active
      background-color md-number-keyboard-key-confirm-bg-tap
.md-slidedown
  height md-number-keyboard-key-height
  background md-number-keyboard-key-bg url(assets/images/keyboard-hide.png) center no-repeat
  background-size 54px
</style>
