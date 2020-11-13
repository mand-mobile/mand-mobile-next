<template>
  <div class="md-example-child md-example-child-scroll-view md-example-child-scroll-view-0">
    <div class="container">
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
        >{{randomFace(5)}}</div>
      </md-scroll-view>
    </div>
    <md-button class="md-button" size="small" inline @click="addItems">新增</md-button>
  </div>
</template>

<script>
import ScrollView from 'mand-mobile/lib/scroll-view'
import ScrollViewRefresh from 'mand-mobile/lib/scroll-view/refresh'
import ScrollViewMore from 'mand-mobile/lib/scroll-view/more'
import Toast from 'mand-mobile/lib/toast'
import Button from 'mand-mobile/lib/button'

import randomFace from 'mand-mobile/lib/scroll-view/demo/data/faces'

export default {
  name: 'scroll-view-demo-0',
  components: {
    'md-scroll-view': ScrollView,
    'md-scroll-view-refresh': ScrollViewRefresh,
    'md-scroll-view-more': ScrollViewMore,
    'md-button': Button,
  },
  data() {
    return {
      list: 20,
      randomFace,
    }
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
.md-example-child-scroll-view-0 .container {
  background: #FFF;
}
.md-example-child-scroll-view-0 .md-button {
  margin-top: 20px;
}
.md-example-child-scroll-view-0 .md-scroll-view {
  height: 600px;
}
.md-example-child-scroll-view-0 .scroll-view-item {
  padding: 20px 0;
  text-align: center;
  font-size: 42px;
  letter-spacing: 5px;
}
.md-example-child-scroll-view-0 .scroll-view-item:nth-child(2n+1) {
  background: #EFEFEF;
}
</style>