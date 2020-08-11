<template>
  <div class="md-example-child md-example-child-scroll-view md-example-child-scroll-view-3">
    <md-scroll-view
      ref="scrollView"
      :scrolling-x="false"
      :styles="{height: '300px'}"
      @end-reached="$_onEndReached"
    >
      <div class="scroll-view-list">
        <p
          v-for="i in list"
          :key="i"
          class="scroll-view-item"
        >{{randomFace(5)}}</p>
      </div>
      <md-scroll-view-more
        slot="more"
        :is-finished="isFinished"
      ></md-scroll-view-more>
    </md-scroll-view>
  </div>
</template>

<script>
import ScrollView from 'mand-mobile/lib/scroll-view'
import ScrollViewMore from 'mand-mobile/lib/scroll-view/more'
import randomFace from 'mand-mobile/lib/scroll-view/demo/data/faces'

export default {
  name: 'scroll-view-demo-3',
  components: {
    'md-scroll-view': ScrollView,
    'md-scroll-view-more': ScrollViewMore,
  },
  data() {
    return {
      list: 10,
      isFinished: false,
      randomFace,
    }
  },
  methods: {
    $_onEndReached() {
      if (this.isFinished) {
        return
      }
      // async data
      setTimeout(() => {
        this.list += 5
        if (this.list >= 20) {
          this.isFinished = true
        }
        this.$refs.scrollView.finishLoadMore()
      }, 1000)
    },
  },
}

</script>

<style>
.md-example-child-scroll-view-3 {
  background: #FFF;
}
.md-example-child-scroll-view-3 .scroll-view-item {
  padding: 30px 0;
  text-align: center;
  font-size: 42px;
  letter-spacing: 5px;
  border-bottom: .5px solid #efefef;
}
.md-example-child-scroll-view-3 .scroll-view-item:nth-child(2n+1) {
  background: #EFEFEF;
}
</style>