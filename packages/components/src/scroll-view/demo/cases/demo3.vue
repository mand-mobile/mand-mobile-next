<template>
  <div class="md-example-child md-example-child-scroll-view md-example-child-scroll-view-3">
    <md-scroll-view
      ref="scrollView"
      :scrolling-x="false"
      @end-reached="$_onEndReached"
    >
      <div
        v-for="i in list"
        :key="i"
        class="scroll-view-list"
      >
        <p class="scroll-view-item">{{i}}</p>
      </div>
      <md-scroll-view-more
        slot="more"
        :is-finished="isFinished"
      ></md-scroll-view-more>
    </md-scroll-view>
  </div>
</template>

<script>
import ScrollView from 'mand-mobile/scroll-view'
import ScrollViewMore from 'mand-mobile/scroll-view/more'

export default {
  name: 'scroll-view-demo-3',
  components: {
    'md-scroll-view': ScrollView,
    'md-scroll-view-more': ScrollViewMore
  },
  data() {
    return {
      list: 5,
      isFinished: false,
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

<style lang="stylus">
.md-example-child-scroll-view-3
  height 800px
  background #FFF
  .scroll-view-item
    padding 30px 0
    text-align center
    font-size 32px
    font-family DINAlternate-Bold
    border-bottom .5px solid #efefef
</style>