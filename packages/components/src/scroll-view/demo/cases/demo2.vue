<template>
  <div class="md-example-child md-example-child-scroll-view md-example-child-scroll-view-2">
    <md-scroll-view
      ref="scrollView"
      :scrolling-x="false"
      :styles="{height: '300px'}"
      @refreshing="$_onRefresh"
    >
      <md-scroll-view-refresh
        slot="refresh"
        slot-scope="{ scrollTop, isRefreshActive, isRefreshing }"
        :scroll-top="scrollTop"
        :is-refreshing="isRefreshing"
        :is-refresh-active="isRefreshActive"
      ></md-scroll-view-refresh>
      <div class="scroll-view-list">
        <p 
          class="scroll-view-item" 
          v-for="i in list"
          :key="i"
        >{{i}}</p>
      </div>
    </md-scroll-view>
  </div>
</template>

<script>
import ScrollView from 'mand-mobile/lib/scroll-view'
import ScrollViewRefresh from 'mand-mobile/lib/scroll-view/refresh'

export default {
  name: 'scroll-view-demo-2',
  components: {
    'md-scroll-view': ScrollView,
    'md-scroll-view-refresh': ScrollViewRefresh,
  },
  data() {
    return {
      list: 5,
    }
  },
  mounted() {
    // window.ScrollViewTrigger1 = () => {
    //   this.$refs.scrollView.triggerRefresh()
    // }
  },
  methods: {
    $_onRefresh() {
      // async data
      setTimeout(() => {
        this.list += 5
        this.$refs.scrollView.finishRefresh()
      }, 2000)
    },
  },
}

</script>

<style>
.md-example-child-scroll-view-2 {
  background: #FFF;
}
.md-example-child-scroll-view-2 .md-scroll-view {
  height: 600px;
}
.md-example-child-scroll-view-2 .scroll-view-item {
  padding: 30px 0;
  text-align: center;
  font-size: 28px;
}
.md-example-child-scroll-view-2 .scroll-view-item:nth-child(2n+1) {
  background: #EFEFEF;
}
</style>