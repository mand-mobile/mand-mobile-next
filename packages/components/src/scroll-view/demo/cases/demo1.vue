<template>
  <div class="md-example-child md-example-child-scroll-view md-example-child-scroll-view-1">
    <md-scroll-view
      class="scroll-view"
      ref="scrollView"
      :scrolling-y="false"
      :touch-angle="80"
      :is-prevent="false"
    >
      <div class="scroll-view-list">
        <p
          v-for="i in list"
          :key="i"
          class="scroll-view-item"
        >{{i}}</p>
      </div>
    </md-scroll-view>
  </div>
</template>

<script>
import ScrollView from 'mand-mobile/scroll-view'

export default {
  name: 'scroll-view-demo-1',
  components: {
    'md-scroll-view': ScrollView,
  },
  data() {
    return {
      list: 5,
    }
  },
}

</script>

<style lang="stylus" scoped>
.md-example-child-scroll-view-1
  .scroll-view-list
    display flex
    width 1000px
    height 100px
    background #FFF
    .scroll-view-item
      flex 1
      text-align center
      font-size 28px
      font-family DINAlternate-Bold
      border-right .5px solid #efefef
      display flex
      align-items center
      justify-content center
      &:nth-child(2n)
        background #efefef
</style>