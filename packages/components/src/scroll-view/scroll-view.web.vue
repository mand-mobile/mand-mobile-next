<template>
  <div
    class="md-scroll-view-primitive md-scroll-view"
    :style="styleContent"
    @touchstart="$_onScrollerTouchStart"
    @touchmove="$_onScrollerTouchMove"
    @touchend="$_onScrollerTouchEnd"
    @touchcancel="$_onScrollerTouchEnd"
    @mousedown="$_onScrollerTouchStart"
    @mousemove="$_onScrollerTouchMove"
    @mouseup="$_onScrollerTouchEnd"
    @mouseleave="$_onScrollerTouchEnd"
  >
    <div
      class="md-scroll-view_container"
      :class="{
        'md-horizon': scrollingX && !scrollingY,
        'md-refresh-enable': refresherEnable
      }"
      :style="transformStyle"
    >
      <div
        v-if="refresherEnable"
        class="md-scroll-view_refresh"
        :class="{
          'refreshing': isRefreshing,
          'refresh-active': isRefreshActive,
        }"
      >
        <slot
          name="refresh"
          :scroll-top="scrollY"
          :is-refreshing="isRefreshing"
          :is-refresh-active="isRefreshActive"
        ></slot>
      </div>
      <slot></slot>
      <div
        v-if="moreLoaderEnable"
        :class="{'md-active': isEndReachingStart || isEndReaching}"
        class="md-scroll-view_more"
      >
        <slot name="more" :is-end-reaching="isEndReachingStart || isEndReaching"></slot>
      </div>
    </div>
  </div>
</template>

<script>
import Scroller from '@mand-mobile/scroller'
import PulldownRefresh from '@mand-mobile/scroller/lib/pull-down'
import {throttle, flatStyleObject, root, mdDocument} from '@mand-mobile/shared/lib/util'

export default {
  name: 'md-scroll-view-primitive',

  props: [
    'scrollingX',
    'scrollingY',
    'bouncing',
    'autoReflow',
    'manualInit',
    'endReachedThreshold',
    'immediateCheckEndReaching',
    'touchAngle',
    'isPrevent',
    'refresherEnable',
    'moreLoaderEnable',
    'styles',
  ],

  data() {
    return {
      scrollTop: 0,
      scrollLeft: 0,
      isInitialed: false,
      isScrollWithAnimation: false,
      isRefreshActive: false,
      isRefreshing: false,
      isEndReachingStart: false,
      isEndReaching: false,

      wrapper: null,
      content: null,
      scroller: null,
      reflowTimer: null,
      refresher: null,
      wrapperW: 0,
      wrapperH: 0,
      contentW: 0,
      contentH: 0,

      transformStyle: '',
      refreshOffsetY: 0,
      moreOffsetY: 0,

      scrollX: null,
      scrollY: null,
    }
  },

  mounted() {
    if (!this.manualInit) {
      this.$_initScroller()
    }
  },
  destroyed() {
    this.$_destroyAutoReflow()
  },

  computed: {
    styleContent() {
      return flatStyleObject(this.styles)
    },
    // hasRefresher() {
    //   return this.refresherEnable || !!(this.$slots.refresh || this.$scopedSlots.refresh)
    // },
    // moreLoaderEnable() {
    //   return !!(this.$slots.more || this.$scopedSlots.more)
    // }
  },
  watch: {
    autoReflow(val) {
      if (val) {
        this.$_initAutoReflow()
      } else {
        this.$_destroyAutoReflow()
      }
    },
  },

  methods: {
    $_initScroller() {
      /* istanbul ignore if */
      if (this.isInitialed) {
        return
      }
      // 初始化scroller
      this.wrapper = this.$el
      this.content = this.wrapper.querySelector('.md-scroll-view_container')
      this.refresher = this.wrapper.querySelector('.md-scroll-view_refresh')
      this.more = this.wrapper.querySelector('.md-scroll-view_more')
      this.refreshOffsetY = this.refresher ? this.refresher.clientHeight : 0
      this.moreOffsetY = this.more ? this.more.clientHeight : 0

      const scroller = new Scroller(this.wrapper, this.content, {
        scrollX: this.scrollingX,
        scrollY: this.scrollingY,
        bounce: this.bouncing,
        bounceTime: 500,
        preventDefault: this.isPrevent,
        probeType: 3,
      })
      scroller.on('translate', this.$_onScrollerTranslate.bind(this))
      scroller.on('scroll', this.$_onScrollerScroll.bind(this))

      this.scroller = scroller
      this.reflowScroller(true)
      this.$_initRefresher(scroller)
      this.$_initMoreLoader(scroller)

      this.autoReflow && this.$_initAutoReflow()
      this.endReachedHandler = throttle(() => {
        this.isEndReaching = true
        this.$emit('endReached')
        this.$emit('end-reached')
      }, 50)

      setTimeout(() => {
        this.isInitialed = true
      }, 50)

      if (this.immediateCheckEndReaching) {
        this.$nextTick(this.$_checkScrollerToEnd)
      }
    },
    $_initRefresher(scroller) {
      if (!this.refresherEnable) {
        return
      }

      this.refresher = new PulldownRefresh(scroller, {
        stop: this.refreshOffsetY,
        threshold: this.refreshOffsetY,
      })
      scroller.on('pullingDownReady', ready => {
        this.isRefreshActive = ready
        this.isRefreshing = false
        ready && this.$emit('refreshActive')
      })
      scroller.on('pullingDown', () => {
        this.isRefreshActive = false
        this.isRefreshing = true
        this.$emit('refreshing')
      })
    },
    $_initMoreLoader() {
      // if (!this.moreLoaderEnable) {
      //   return
      // }
    },

    $_initAutoReflow() {
      this.$_destroyAutoReflow()
      this.reflowTimer = setInterval(() => {
        this.reflowScroller()
      }, 100)
    },
    $_destroyAutoReflow() {
      this.reflowTimer && clearInterval(this.reflowTimer)
    },
    $_checkScrollerToEnd() {
      const top = this.scrollY
      const maxScroll = Math.abs(this.scroller.scrollBehaviorY.maxScrollPos)
      const moreOffsetY = this.moreOffsetY + this.endReachedThreshold
      const endOffset = maxScroll - (Math.abs(top) + moreOffsetY)

      if (top < 0 && !this.isEndReaching && endOffset <= 0 && this.endReachedHandler) {
        // First prepare for "load more" state
        this.isEndReachingStart = true
        // Second enter "load more" state
        // & trigger endReached event only once after the rebounding animation
        this.endReachedHandler()
      }
    },
    $_checkScrollerBoundery() {
      const boundaryDistance = 15
      const scrollLeft = mdDocument.documentElement.scrollLeft || root.pageXOffset || mdDocument.body.scrollLeft
      const scrollTop = mdDocument.documentElement.scrollTop || root.pageYOffset || mdDocument.body.scrollTop

      const pX = this.currentX - scrollLeft
      const pY = this.currentY - scrollTop
      if (
        pX > mdDocument.documentElement.clientWidth - boundaryDistance ||
        pY > mdDocument.documentElement.clientHeight - boundaryDistance ||
        pX < boundaryDistance ||
        pY < boundaryDistance
      ) {
        return true
      }

      return false
    },
    $_checkScrollerAngle() {
      const diffX = this.currentX - this.startX
      const diffY = this.currentY - this.startY

      let angle = Math.atan2(Math.abs(diffY), Math.abs(diffX)) * 180 / Math.PI

      if (this.scrollingX) {
        angle = 90 - angle
      }

      return angle < this.touchAngle
    },

    $_onScrollerTouchStart(event) {
      const point = event.touches ? event.touches[0] : event
      this.startX = point.pageX
      this.startY = point.pageY

      this.scroller.handleStart(event)
    },
    $_onScrollerTouchMove(event) {
      const point = event.touches ? event.touches[0] : event
      this.currentX = point.pageX
      this.currentY = point.pageY

      if ((!this.scrollingX || !this.scrollingY) && this.$_checkScrollerAngle()) {
        return
      }

      if (this.$_checkScrollerBoundery()) {
        this.scroller.handleEnd(event)
        return
      }

      this.scroller.handleMove(event)
    },
    $_onScrollerTouchEnd(event) {
      this.scroller.handleEnd(event)
    },
    $_onScrollerMouseDown() {},
    $_onScrollerMouseMove() {},
    $_onScrollerMouseUp() {},

    $_onScrollerTranslate(point, styles) {
      let styleContent = ''
      for (const key in styles) {
        if (styles.hasOwnProperty(key)) {
          styleContent += `${key}:${styles[key]};`
        }
      }
      this.transformStyle = styleContent
    },
    $_onScrollerScroll(point) {
      const left = +point.x.toFixed(2)
      const top = +point.y.toFixed(2)

      if (this.scrollX === left && this.scrollY === top) {
        return
      }

      this.scrollX = left
      this.scrollY = top

      this.$_checkScrollerToEnd()

      this.$emit('scroll', {
        scrollLeft: left,
        scrollTop: top,
      })
    },

    reflowScroller(force = false) {
      this.$nextTick(() => {
        const wrapperRect = this.wrapper.getBoundingClientRect()
        const contentRect = this.content.getBoundingClientRect()

        if (
          force ||
          this.wrapperW !== wrapperRect.width ||
          this.wrapperH !== wrapperRect.height ||
          this.contentW !== contentRect.width ||
          this.contentH !== contentRect.height
        ) {
          this.scroller.setDimensions(wrapperRect, contentRect)
          this.scroller.refresh()
          // console.log(this.scroller.scrollBehaviorY.maxScrollPos)
          this.wrapperW = wrapperRect.width
          this.wrapperH = wrapperRect.height
          this.contentW = contentRect.width
          this.contentH = contentRect.height
        }
      })
    },
    getSizes() {
      return {
        wrapperW: this.wrapperW,
        wrapperH: this.wrapperH,
        contentW: this.contentW,
        contentH: this.contentH,
      }
    },
    getOffsets() {
      return this.scroller.getOffsets()
    },
    scrollTo(left, top, animate = false) {
      this.scroller.scrollTo(left, top, animate ? 300 : 0)
    },
    triggerRefresh() {
      this.refresher && this.refresher.triggerPullToRefresh()
    },
    finishRefresh() {
      if (!this.refresher) {
        return
      }
      this.refresher.finish()
      this.reflowScroller()
    },
    finishLoadMore() {
      this.isEndReachingStart = false
      this.isEndReaching = false
      this.reflowScroller()
    },
  },
}

</script>

<style lang="stylus">
.md-scroll-view
  position relative
  display block
  height 100%
  overflow hidden
  user-select none
  .md-scroll-view_container
    &.md-refresh-enable
      min-height 100%
    .md-scroll-view_refresh
      clearfix()
      position absolute
      left 0
      right 0
      transform translate3d(0, -100%, 0)
    .md-scroll-view_more
      visibility hidden
      &.md-active
        visibility visible
    &.md-horizon
        display inline-block
</style>