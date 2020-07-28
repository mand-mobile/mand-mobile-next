<template>
  <div
    v-show="isPopupWrapperShow"
    class="md-popup"
    :class="[
      hasMask ? 'md-popup--mask' : '',
      position ? `md-popup--${position}` : '',
      isAbsolute? 'md-popup--absolute' : '',
      isInner? 'inner-popup' : ''
    ]"
  >
    <md-transition :show="hasMask && isPopupBoxShow" name="md-fade">
      <div class="md-popup_mask" @click="$_onPopupMaskClick"></div>
    </md-transition>
    <md-transition
      :show="isPopupBoxShow"
      :name="transitionName"
      :styles="{height: (position === 'left' || position === 'right') ? '100%' : 'auto'}"
      @before-enter="$_onPopupTransitionStart"
      @before-leave="$_onPopupTransitionStart"
      @after-enter="$_onPopupTransitionEnd"
      @after-leave="$_onPopupTransitionEnd"
    >
      <div class="md-popup_box"  :class="[transitionName, isFullScreen ? 'md-popup_box--full' : '' ]">
        <slot></slot>
      </div>
    </md-transition>
  </div>
</template>

<script>import Transition from '../transition'
import popupMixin from './mixins'

export default {
  name: 'md-popup',
  mixins: [popupMixin],
  components: {
    'md-transition': Transition,
  },
  props: {
    position: {
      type: String,
      default: 'center',
    },
    transition: {
      type: String,
      default: '',
    },
    preventScroll: {
      type: Boolean,
      default: false,
    },
    preventScrollExclude: {
      type: [String, Function],
      default() {
        return ''
      },
    },
    isFullScreen: {
      type: Boolean,
      default: false,
    },
    isAbsolute: {
      type: Boolean,
      default: false,
    },
    isInner: {
      type: Boolean,
      default: false,
    },
    // Mixin Props
    // value: {
    //   type: Boolean,
    //   default: false,
    // },
    // hasMask: {
    //   type: Boolean,
    //   default: true,
    // },
    // maskClosable: {
    //   type: Boolean,
    //   default: true,
    // },
  },

  data() {
    return {
      transitionName: '',
      // controle popup mask & popup box
      isPopupWrapperShow: false,
      // controle popup box
      isPopupBoxShow: false,
      // transtion lock
      isAnimation: false,
    }
  },
  watch: {
    value(val) {
      /* istanbul ignore next */
      if (val) {
        if (this.isAnimation) {
          setTimeout(() => {
            this.$_showPopupBox()
          }, 50)
        } else {
          this.$_showPopupBox()
        }
      } else {
        this.$_hidePopupBox()
      }
    },
    transition: {
      handler() {
        this.transitionName = this.$_getTransitionName()
      },
      immediate: true,
    },
  },

  mounted() {
    this.value && this.$_showPopupBox()
  },

  methods: {
    // MARK: private methods
    $_getTransitionName() {
      if (this.transition) {
        return this.transition
      }

      switch (this.position) {
        case 'bottom':
          return 'md-slide-up'
        /* istanbul ignore next */
        case 'top':
          return 'md-slide-down'
        /* istanbul ignore next */
        case 'left':
          return 'md-slide-right'
        /* istanbul ignore next */
        case 'right':
          return 'md-slide-left'
        default:
          return 'md-fade'
      }
    },
    $_showPopupBox() {
      this.isPopupWrapperShow = true
      this.isAnimation = true
      // popup box enter the animation after popup show
      this.isPopupBoxShow = true
      /* istanbul ignore if */
      if (process.env.NODE_ENV === 'test') {
        this.$_onPopupTransitionStart()
        this.$_onPopupTransitionEnd()
      }
    },
    $_hidePopupBox() {
      this.isAnimation = true
      this.isPopupBoxShow = false
      this.$emit('input', false)
      /* istanbul ignore if */
      if (process.env.NODE_ENV === 'test') {
        this.$_onPopupTransitionStart()
        this.$_onPopupTransitionEnd()
      }
    },
    $_stopImmediatePropagation(event) {
      /* istanbul ignore next */
      event.stopImmediatePropagation()
    },

    // MARK: event handler
    $_onPopupTransitionStart() {
      if (!this.isPopupBoxShow) {
        this.$emit('beforeHide')
        this.$emit('before-hide')
      } else {
        this.$emit('beforeShow')
        this.$emit('before-show')
      }
    },
    $_onPopupTransitionEnd() {
      /* istanbul ignore next */
      if (!this.isAnimation) {
        return
      }

      /* istanbul ignore next */
      if (!this.isPopupBoxShow) {
        // popup hide after popup box finish animation
        this.isPopupWrapperShow = false
        this.$emit('hide')
      } else {
        this.$emit('show')
      }

      /* istanbul ignore next */
      this.isAnimation = false
    },
    $_onPopupMaskClick() {
      if (this.maskClosable) {
        this.$_hidePopupBox()
        this.$emit('maskClick')
      }
    },
  },
}
</script>

<style lang="stylus">
.md-popup
  absolute-pos()
  position fixed
  display flex
  pointer-events none
  z-index md-popup-zindex
  &--center, &--center-top, &--center-bottom
    justify-content center
    align-items center

  &--top
    flex-direction column
    justify-content flex-start
    .md-popup_box
      width 100%

  &--bottom
    flex-direction column
    justify-content flex-end
    .md-popup_box
      width 100%

  &--left
    justify-content flex-start
    .md-popup_box
      height 100%

  &--right
    justify-content flex-end
    .md-popup_box
      height 100%

  &--center-top
    top 50px
    bottom auto

  &--center-bottom
    bottom 50px
    top auto

  &--absolute
    position absolute
  &.inner-popup .md-popup_box
    background-color md-color-bg-inverse
    border-radius md-popup-title-bar-radius md-popup-title-bar-radius 0 0

.md-popup_mask
  absolute-pos()
  position absolute
  z-index 1
  pointer-events auto
  background-color md-popup-mask-bg

.md-popup_box
  position relative
  z-index 2
  max-width 100%
  max-height 100%
  overflow auto
  pointer-events auto
  &--full
    position absolute
    absolute-pos()
</style>
