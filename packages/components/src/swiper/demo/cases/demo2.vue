<template>
  <div class="md-example-child md-example-child-swiper md-example-child-swiper-2">
    <md-swiper
      @before-change="beforeChange"
      @after-change="afterChange"
      :autoplay="0"
      transition="fade"
      ref="swiper">
      <md-swiper-item :key="$index" v-for="(item, $index) in simple">
        <div
          class="banner-item"
          :style="{'background': `${item.color}`}">{{item.text}}</div>
      </md-swiper-item>
    </md-swiper>
  </div>
</template>

<script>import Swiper from '../../index'
import SwiperItem from '../../swiper-item'
import simple from '../../demo/data/simple'

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
  mounted() {
    // window.triggerSwiper3 = () => {
    //   this.goto()
    // }
  },
  methods: {
    // setValue(id, value) {
    //   document.querySelector(id) && (document.querySelector(id).innerHTML = value)
    // },
    // beforeChange(from, to) {
    // this.setValue('#valueSwiper10', from)
    // this.setValue('#valueSwiper11', to)
    // },
    // afterChange(from, to) {
    // this.setValue('#valueSwiper12', from)
    // this.setValue('#valueSwiper13', to)
    // },
    goto() {
      this.$refs.swiper.goto(2)
    },
  },
}
</script>

<style lang="stylus">
.md-example-child-swiper-2 {
  height: 250px;
}
.md-example-child-swiper-2 .banner-item {
  float: left;
  width: 100%;
  height: 100%;
  line-height: 250px;
  text-align: center;
  font-size: 28px;
  color: #FFF;
  box-align: center;
  align-items: center;
  box-pack: center;
  justify-content: center;
  text-decoration-line: none;
}
</style>
