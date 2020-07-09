<template>
  <div class="md-toast" :class="[position]">
    <md-popup
      class="md-popup"
      :value="visible"
      :position="position === 'center' ? position : `center-${position}`"
      :hasMask="hasMask"
      :maskClosable="false"
      @show="$_onShow"
      @hide="$_onHide"
    >
      <div class="md-toast-content" v-if="$slots.default">
        <slot></slot>
      </div>
      <div class="md-toast-content" v-else>
        <md-icon
          v-if="innerIcon"
          class="md-icon"
          :name="innerIcon"
          size="lg"
          :svg="iconSvg"
        />
        <div class="md-toast-text" v-if="content" v-text="content"></div>
      </div>
    </md-popup>
  </div>
</template>

<script>
import Popup from '../popup'
import Icon from '../icon'

export default {
  name: 'md-toast',

  components: {
    'md-popup': Popup,
    'md-icon': Icon,
  },

  props: {
    type: {
      // info, succeed, failed
      type: String,
      default: ''
    },
    icon: {
      type: String,
      default: '',
    },
    iconSvg: {
      type: Boolean,
      default: false,
    },
    content: {
      type: [String, Number],
      default: '',
    },
    duration: {
      type: Number,
      default: 3000,
    },
    position: {
      // top, center, bottom
      type: String,
      default: 'center',
    },
    hasMask: {
      type: Boolean,
      default: false,
    },
  },

  data() {
    return {
      visible: false,
    }
  },

  computed: {
    innerIcon() {
      switch (this.type) {
        case 'info':
          return this.icon || 'info'
          break
        case 'succeed':
          return this.icon || 'success'
          break
        case 'failed':
          return this.icon || 'fail'
          break
        case 'loading':
          return this.icon || 'spinner'
          break 
        default:
          return this.icon
      }
    }
  },

  beforeDestroy() {
    if (this.$_timer) {
      clearTimeout(this.$_timer)
    }
  },

  methods: {
    $_onShow() {
      this.$emit('show')
    },
    $_onHide() {
      this.$emit('hide')
    },
    fire() {
      if (this.$_timer) {
        clearTimeout(this.$_timer)
      }
      if (this.visible && this.duration) {
        this.$_timer = setTimeout(() => {
          this.hide()
        }, this.duration)
      }
    },
    show() {
      this.visible = true
      this.fire()
    },
    hide() {
      this.visible = false
    },
  },
}

</script>

<style lang="stylus">
.md-toast
  .md-popup
    z-index toast-zindex
    .md-popup-box
      width 540px
      display flex
      justify-content center
    .md-popup-mask
      background transparent
  .md-icon
    flex-shrink 0
    color toast-color
  .md-icon + .md-toast-text
    margin-left h-gap-sm

.md-toast-content
  display inline-flex
  align-items center
  max-width 100%
  min-width 80px
  padding toast-padding
  border-radius toast-radius
  font-size toast-font-size
  text-align left
  line-height 1.42857142
  color toast-color
  background-color toast-fill
  box-sizing border-box
  overflow hidden

.md-toast-text
  white-space nowrap
  text-overflow: ellipsis
  overflow hidden
</style>
