<template>
  <div class="md-tip" :class="wrapperCls">
    <div class="md-tip_content">
      <template v-if="!$slots.default">
        <md-icon
          v-if="icon"
          class="md-tip_content_icon"
          :name="icon"
          :svg="iconSvg"
        />
        <div class="md-tip_content_text" v-text="content"></div>
      </template>
      <template v-else>
        <slot></slot>
      </template>
      <md-icon
        v-if="closable"
        name="close"
        size="md"
        @click.native="$_onClose"
      />
    </div>
    <div class="md-tip_bg"></div>
  </div>
</template>

<script>
import Icon from '../icon'

export default {
  name: 'md-tip',
  components: {
    [Icon.name]: Icon,
  },

  props: {
    placement: {
      type: String,
    },
    closable: {
      type: Boolean,
      default: true,
    },
    icon: {
      type: String,
    },
    iconSvg: {
      type: Boolean,
    },
    content: {
      type: [String, Number],
    },
    name: {
      type: [String, Number],
    },
  },

  computed: {
    wrapperCls() {
      return {
        'has-close': this.closable,
        [`is-${this.placement}`]: ['left', 'bottom', 'right'].indexOf(this.placement) !== -1,
        [this.name]: !!this.name,
      }
    },
  },

  methods: {
    $_onClose() {
      this.$emit('close')
    },
  },
}

</script>


<style lang="stylus">
.md-tip
  position relative
  display inline-block
  // max-width 400px
  z-index md-tip-zindex

  &_content
    clearfix()
    position relative
    padding md-tip-padding
    color md-tip-color
    font-size md-tip-font-size
    line-height 1.2
    z-index 2
    &_icon
      float left
      margin-right 14px
    &_text
      float left
      margin-top 2px


  &_bg
    position absolute
    absolute-pos()
    border-radius md-tip-radius
    background-color md-tip-fill
    box-shadow md-tip-shadow
    opacity md-tip-fill-opacity
    &::after
      content ''
      position absolute
      bottom -10px
      left 50%
      margin-left -11px
      width 0
      height 0
      border-style solid
      border-width 10px 11px 0 11px
      border-color md-tip-fill transparent transparent transparent

  &.has-close
    .md-tip_content
      padding-right 60px
  &.is-bottom
    .md-tip_bg::after
      bottom auto
      top -10px
      border-width 0 11px 10px 11px
      border-color transparent transparent md-tip-fill transparent
  &.is-left
    .md-tip_bg::after
      top 50%
      right -6px
      left auto
      margin-top -11px
      border-width 11px 0 11px 10px
      border-color transparent transparent transparent md-tip-fill
  &.is-right
    .md-tip_bg::after
      top 50%
      left 4px
      margin-top -11px
      border-width 11px 10px 11px 0
      border-color transparent md-tip-fill transparent transparent

  .md-icon.md-icon-close
    position absolute
    right 16px
    top 50%
    width md-tip-close-size
    height md-tip-close-size
    transform translateY(-50%)
</style>
