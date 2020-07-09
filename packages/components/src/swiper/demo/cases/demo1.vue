<template>
  <div class="md-example-child md-example-child-swiper md-example-child-swiper-1">
    <md-swiper
      :dragable="false"
      :autoplay="5000"
      transition="slideY"
      @before-change="beforeChange"
      @after-change="afterChange"
    >
      <md-swiper-item :key="$index" v-for="(item, $index) in simple">
        <div
          class="banner-item"
          :style="{'background': `${item.color}`}">{{item.text}}</div>
      </md-swiper-item>
    </md-swiper>
  </div>
</template>

<script>
import Swiper from 'mand-mobile/swiper'
import SwiperItem from 'mand-mobile/swiper/swiper-item'
import simple from 'mand-mobile/swiper/demo/data/simple'

export default {
  name: 'swiper-demo',
  components: {
    'md-swiper': Swiper,
    'md-swiper-item': SwiperItem,
  },
  data() {
    return {
      simple,
    }
  },
  methods: {
    // setValue(id, value) {
    //   document.querySelector(id) && (document.querySelector(id).innerHTML = value)
    // },
    beforeChange(from, to) {
      // this.setValue('#valueSwiper5', from)
      // this.setValue('#valueSwiper6', to)
    },
    afterChange(from, to) {
      // this.setValue('#valueSwiper7', from)
      // this.setValue('#valueSwiper8', to)
    },
  },
}

</script>

<style lang="stylus">
.md-example-child-swiper-1
  height 250px
  .banner-item
    float left
    width 100%
    height 100%
    line-height 250px
    text-align center
    font-size 28px
    color #FFF
    box-align center
    align-items center
    box-pack center
    justify-content center
    text-decoration-line none
</style>
