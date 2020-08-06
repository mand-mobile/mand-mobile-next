<template>
  <div class="md-example-child md-example-child-scroll-view md-example-child-scroll-view-0">
    <md-scroll-view
      class="md-scroll-view"
      ref="scrollView"
      :styles="{height: '300px'}"
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
import ScrollView from 'mand-mobile/lib/scroll-view'
import ScrollViewRefresh from 'mand-mobile/lib/scroll-view/refresh'
import ScrollViewMore from 'mand-mobile/lib/scroll-view/more'
import Toast from 'mand-mobile/lib/toast'

export default {
  name: 'scroll-view-demo-0',
  components: {
    'md-scroll-view': ScrollView,
    'md-scroll-view-refresh': ScrollViewRefresh,
    'md-scroll-view-more': ScrollViewMore,
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
      Toast.info(`Click ${i}`)
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

<style>
.md-example-child-scroll-view-0 {
  background: #FFF;
}
.md-example-child-scroll-view-0 .md-scroll-view {
  height: 600px;
}
.md-example-child-scroll-view-0 .scroll-view-item {
  padding: 30px 0;
  text-align: center;
  font-size: 28px;
}
.md-example-child-scroll-view-0 .scroll-view-item:nth-child(2n+1) {
  background: #EFEFEF;
}
</style>