<template>
  <div class="md-example-child md-example-child-scroll-view md-example-child-scroll-view-1">
    <md-scroll-view
      class="scroll-view"
      ref="scrollView"
      :scrolling-y="false"
      :touch-angle="80"
    >
      <div class="scroll-view-list">
        <p
          v-for="i in list"
          :key="i"
          class="scroll-view-item"
        >{{randomFace(1)}}</p>
      </div>
    </md-scroll-view>
  </div>
</template>

<script>
import ScrollView from 'mand-mobile/lib/scroll-view'
import randomFace from 'mand-mobile/lib/scroll-view/demo/data/faces'

export default {
  name: 'scroll-view-demo-1',
  components: {
    'md-scroll-view': ScrollView,
  },
  data() {
    return {
      list: 5,
      randomFace,
    }
  },
}

</script>

<style>
.md-example-child-scroll-view-1 {
  background: #FFF;
}
.md-example-child-scroll-view-1 .scroll-view-list {
  display: flex;
  width: 1000px;
  height: 100px;
}
.md-example-child-scroll-view-1 .scroll-view-list .scroll-view-item {
  display: flex;
  align-items: center;
  justify-content: center;
  flex: 1;
  text-align: center;
  font-size: 42px;
  border-right: .5px solid #EFEFEF;
}
.md-example-child-scroll-view-1 .scroll-view-list .scroll-view-item:nth-child(2n+1) {
  background: #EFEFEF;
}
</style>