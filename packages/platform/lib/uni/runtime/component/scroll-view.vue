<template>
  <scroll-view
    class="md-scroll-view-primitive md-scroll-view" 
    :scroll-x="scrollingX"
    :scroll-y="scrollingY"
    :scroll-top="scrollTop"
    :scroll-left="scrollLeft"
    :scroll-with-animation="isScrollWithAnimation"
    :lower-threshold="endReachedThreshold"
    :refresher-enabled="refresherEnable"
    :refresher-triggered="isRefreshing"
    :refresher-threshold="200"
    :style="styleContent"
    @scroll="$_onScroll"
    @scrolltolower="$_onScrollToLower"
    @refresherrefresh="$_onRefresherRefreshing"
  >
    <div
      class="md-scroll-view-container"
      :class="{
        'horizon': scrollingX && !scrollingY,
      }"
    >
      <slot></slot>
    </div>
  </scroll-view>
</template>

<script>
import {flatStyleObject} from 'mand-mobile/_util'
export default {
  name: 'md-scroll-view-primitive',

  props: {
    scrollingX: {
      type: Boolean,
      default: false,
    },
    scrollingY: {
      type: Boolean,
      default: true,
    },
    height: {
      type: [Number, String],
      default: 'auto',
    },
    refresherEnable: {
      type: Boolean,
      default: false,
    },
    endReachedThreshold: {
      type: Number,
      default: 0,
    },
    styles: {
      type: Object
    }
  },

  data() {
    return {
      scrollTop: 0,
      scrollLeft: 0,
      scrollTopTmp: 0,
      scrollLeftTmp: 0,
      wrapperRect: null,
      contentRect: null,
      isScrollWithAnimation: false,
      isRefreshing: false
    }
  },

  computed: {
    styleContent() {
      return flatStyleObject(this.styles)
    }
  },

  mounted() {
    this.reflowScroller()
  },

  methods: {
    $_onScroll(event) {
      const {scrollTop, scrollLeft, deltaX, deltaY} = event.detail
      
      this.$emit('scroll', {
        scrollTop: -scrollTop,
        scrollLeft: -scrollLeft,
        deltaX,
        deltaY
      })

      if (this.scrollTopTmp !== scrollTop || this.scrollLeftTmp !== scrollLeft) {
        this.scrollLeftTmp = scrollLeft
        this.scrollTopTmp = scrollTop
      }
    },
    $_onScrollToLower() {
      this.isEndReaching = true
      this.$emit('end-reached')
    },
    $_onRefresherRefreshing() {
      this.isRefreshing = true
      this.$emit('refreshing')
    },

    async reflowScroller() {
      this.wrapperRect = await this.$MDDom().querySelector('.md-scroll-view').getBoundingClientRect()
      this.contentRect = await this.$MDDom().querySelector('.md-scroll-view-container').getBoundingClientRect()
    },
    getSizes() {
      return {
        wrapperW: this.wrapperRect.width,
        wrapperH: this.wrapperRect.height,
        contentW: this.contentRect.width,
        contentH: this.contentRect.height,
      }
    },
    getOffsets() {
      return {
        left: -this.scrollLeftTmp,
        top: -this.scrollTopTmp
      }
    },
    scrollTo(left, top, animate = false) {
      this.isScrollWithAnimation = animate
      this.$nextTick(() => {
        this.scrollLeft = -left
        this.scrollTop = -top
        // this.scrollLeftTmp =  -left
        // this.scrollTopTmp = -top
      })
    },
    triggerRefresh() {
      if (this.hasRefresher) {
        this.isRefreshing = true
      }
    },
    finishRefresh() {
      this.isRefreshing = false
    },
    finishLoadMore() {
    },
  }

}
</script>

<style lang="stylus">
.md-scroll-view-primitive
  .md-scroll-view-container
    position relative
    &.horizon
      display inline-block
</style>