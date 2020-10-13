<template>
  <div
    class="md-notice-bar"
    :class="[
      round && 'md-notice-bar--round',
      type
    ]"
    v-if="isShow"
  >
    <div class="md-notice-bar_left" :class="[(!customLeft && !icon) && 'md-notice-bar--empty']">
      <!-- custom first -->
      <template v-if="customLeft">
        <slot name="left"></slot>
      </template>
      <template v-else-if="icon">
        <md-icon class="md-notice-icon" :name="icon" :svg="iconSvg"></md-icon>
      </template>
    </div>
    <div
      class="md-notice-bar_content"
      :class="[
        multiRows && 'md-notice-bar_content--multi'
      ]"
      ref="wrap"
    >
    <!-- 小程序不可用 -->
      <div id="md-notice-bar_content_item" :class="[(overflow && scrollable) && 'md-notice-bar_content--animate']" ref="content">
        <slot></slot>
      </div>
    </div>
    <div class="md-notice-bar_right">
      <!-- custom first -->
      <template v-if="customRight">
        <slot name="right"></slot>
      </template>
      <template v-else-if="mode || closable">
        <md-icon
          class="md-notice-icon md-notice-icon-right"
          :name="rightIcon"
          @click.native.stop="$_close"
        ></md-icon>
      </template>
    </div>
  </div>
</template>

<script>
import {Dom} from '@mand-mobile/platform-runtime/lib/module'
import Icon from '../icon'
export default {
  name: 'md-notice-bar',

  components: {
    'md-icon': Icon,
  },

  props: {
    mode: {
      type: String,
      default: '',
    },
    type: {
      type: String,
      default: 'default', // default/activity/warning
    },
    time: {
      type: Number,
      default: 0,
    },
    round: {
      type: Boolean,
      default: false,
    },
    multiRows: {
      type: Boolean,
      default: false,
    },
    scrollable: {
      type: Boolean,
      default: false,
    },
    // will be delete in future
    icon: {
      type: String,
      default: '',
    },
    iconSvg: {
      type: Boolean,
      default: false,
    },
    // will be delete in future
    closable: {
      type: Boolean,
      default: false,
    },
  },

  data() {
    return {
      isShow: true,
      overflow: false,
    }
  },

  computed: {
    customLeft() {
      return !!this.$slots.left
    },

    customRight() {
      return !!this.$slots.right
    },

    rightIcon() {
      return this.mode === 'link' ? 'arrow-right' : 'close'
    },
  },

  updated() {
    this.$_checkOverflow()
  },

  mounted() {
    if (this.time) {
      this.$_hide(this.time)
    }
    this.$_checkOverflow()
  },

  methods: {
    // MARK: private methods
    $_hide(time) {
      setTimeout(() => {
        this.isShow = false
      }, time)
    },
    $_close() {
      if (this.mode === 'closable' || this.closable) {
        this.isShow = false
      }
      this.$emit('close')
    },
    async $_checkOverflow() {
      if (!this.scrollable) {
        return
      }

      const $MDDOM = Dom.bind(this)()
      const wrap = $MDDOM.querySelector('.md-notice-bar_content')
      const content = $MDDOM.querySelector('#md-notice-bar_content_item')
      /* istanbul ignore if */
      if (!wrap || !content) {
        return
      }

      /**
       * 计算 padding-left 对宽度的影响
       * 替换 clientWidth 为 getBoundingClientRect
       */
      const paddingLeft = content.getComputedStyle(['padding'])['padding'].split(' ')[3] || '0px'
      const width = (await wrap.getBoundingClientRect()).width
      const left = +paddingLeft.match(/\d+/g)[0]
      this.overflow = (content.scrollWidth || 0) - left > Math.ceil(width)
    },
  },
}

</script>

<style lang="stylus">
.md-notice-bar
  position relative
  z-index md-notice-bar-zindex
  display flex
  min-height 64px
  padding-left 32px
  color md-notice-bar-color
  font-size md-notice-bar-font-size
  background-color md-notice-bar-fill
  box-sizing border-box
  &.md-notice-bar--round
    border-radius md-notice-bar-border-radius
  &.activity
    background-color md-notice-bar-fill-activity
    color md-notice-bar-color-activity
  &.warning
    color notice-bar-color-warning
    background-color notice-bar-fill-warning

.md-notice-bar_left,
.md-notice-bar_right
  display flex
  align-items center

.md-notice-bar_left
  padding-right 12px
.md-notice-bar_right
  padding-right 32px
.md-notice-bar--empty
  padding-right 0

.md-notice-bar_content
  flex 1
  width auto
  line-height 64px
  margin auto
  white-space nowrap
  overflow hidden
  &.md-notice-bar_content--multi
    line-height md-font-caption-large
    padding md-h-gap-md 0
    white-space normal
  .md-notice-bar_content--animate
    display inline-block
    padding-left 100%
    animation md-notice-bar-animation linear 16s infinite both

@keyframes md-notice-bar-animation {
  0% {
    transform translate3d(0, 0, 0)
  }
  100% {
    transform translate3d(-100%, 0, 0)
  }
}
</style>
