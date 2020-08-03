<template>
  <div class="md-landscape" :class="{'is-full': fullScreen}">
		<md-popup
      v-model="isLandscapeShow"
      :mask-closable="maskClosable"
      prevent-scroll
      prevent-scroll-exclude=".md-landscape_body_content"
      :has-mask="!fullScreen && hasMask"
      :is-full-screen="fullScreen"
      :transition="transition"
      @input="$emit('input', false)"
      @show="$emit('show')"
      @hide="$emit('hide')">
      <div class="md-landscape_body" :class="{scroll}">
        <div class="md-landscape_body_content">
          <slot></slot>
        </div>
        <md-icon
          class="md-landscape_body_close"
          :class="{dark: !hasMask || fullScreen}"
          @click="$_close"
          :name="fullScreen ? 'clear' : 'close'"
        />
      </div>
    </md-popup>
  </div>
</template>

<script>import Popup from '../popup'
import Icon from '../icon'

export default {
  name: 'md-landscape',

  components: {
    'md-popup': Popup,
    'md-icon': Icon,
  },

  props: {
    value: {
      type: Boolean,
      default: false,
    },
    scroll: {
      type: Boolean,
      default: false,
    },
    fullScreen: {
      type: Boolean,
      default: false,
    },
    hasMask: {
      type: Boolean,
      default: true,
    },
    maskClosable: {
      type: Boolean,
      default: false,
    },
    transition: {
      type: String,
      default() {
        return 'md-fade'
      },
    },
  },

  data() {
    return {
      isLandscapeShow: this.value,
    }
  },

  watch: {
    value(val) {
      this.isLandscapeShow = val
    },
  },

  methods: {
    // MARK: private methods
    $_close() {
      this.isLandscapeShow = false
    },
  },
}
</script>

<style lang="stylus">
.md-landscape
  &.is-full
    .md-landscape_body
      width 100%
      height 100%
      background md-landscape-fullscreen-bg
    .md-landscape_body_content
      width 100%
      height 100%
      overflow auto
      -webkit-overflow-scrolling touch
    .md-landscape_body_close
      position absolute
      right 25px
      top 25px
      margin auto

  .md-popup, .md-popup-box
    z-index md-landscape-zindex
  .md-landscape_body
    .md-landscape_body_close
      position relative
      display block
      width 50px
      height 50px
      line-height 50px
      margin 50px auto 20px auto
      font-size 50px
      color md-color-text-base-inverse
      text-align center
      &.dark
        color md-color-text-base
        opacity 0.5

.md-landscape_body_content
  width md-landscape-width
  font-size md-font-body-large
  overflow auto
  -webkit-overflow-scrolling touch
  box-sizing border-box
  img
    max-width 100%
    height auto
</style>
