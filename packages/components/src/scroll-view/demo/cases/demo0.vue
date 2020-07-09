<template>
  <div class="md-example-child md-example-child-scroll-view md-example-child-scroll-view-0">
    <md-scroll-view
      ref="scrollView"
      @scroll="$_onScroll"
    >
      <div
        v-for="i in list"
        class="scroll-view-item"
        :key="i"
        @click="$_onItemClick(i)"
      >
        {{i}}
      </div>
    </md-scroll-view>
  </div>
</template>

<script>
import ScrollView from 'mand-mobile/scroll-view'
import ScrollViewRefresh from 'mand-mobile/scroll-view/refresh'
import ScrollViewMore from 'mand-mobile/scroll-view/more'

export default {
  name: 'scroll-view-demo-0',
  components: {
    'md-scroll-view': ScrollView,
    'md-scroll-view-refresh': ScrollViewRefresh,
    'md-scroll-view-more': ScrollViewMore
  },
  data() {
    return {
      list: 20,
    }
  },
  mounted() {
    // window.ScrollViewTrigger0 = () => {
    //   this.addItems()
    // }
  },
  methods: {
    $_onItemClick(i) {
      // Toast.info(`Click ${i}`)
    },
    $_onScroll({scrollLeft, scrollTop}) {
      console.log(`[Mand Mobile ScrollView - demo0 - onScroll] scrollLeft: ${scrollLeft}, scrollTop: ${scrollTop}`)
    },
    addItems() {
      this.list += 5
      // 如果把autoReflow设置为false, 需调用reflowScroller
      this.$refs.scrollView.reflowScroller()
    },
  },
}

</script>

<style lang="stylus">
.md-example-child-scroll-view-0
  .md-scroll-view
    height 600px
    background #FFF
  .scroll-view-item
    padding 30px 0
    text-align center
    font-size 28px
    font-family DINAlternate-Bold
    background #FFF
    &:nth-child(2n)
      background #efefef
  .inner-scroll-view
    height 100px
    line-height 100px
    border solid 4px #2f86f6
    border-radius 6px
    background #efefef
    text-align left
    .content
      // display inline-block
      padding 0 30px
      // height 100px
      // line-height 100px
      &:nth-child(2n)
        background #fff
</style>