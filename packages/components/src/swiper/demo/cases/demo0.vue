<template>
  <div class="md-example-child md-example-child-swiper md-example-child-swiper-0">
    <md-swiper
      ref="swiper"
      :is-prevent="false"
      :autoplay="0"
      @before-change="beforeChange"
      @after-change="afterChange"
    >
      <md-swiper-item :key="index" v-for="(item, index) in simple">
        <div class="banner-item" :style="{'background': `${item.color}`}">{{item.text}}</div>
      </md-swiper-item>
    </md-swiper>
  </div>
</template>

<script>
import Swiper from '../../index'
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
    // Simulation of asynchronous
    // setTimeout(() => {
    //   this.simple = simple.concat(simple)
    // }, 10000)
    // Simulation of asynchronous
    // setTimeout(() => {
    //   this.simple = simple
    // }, 24500)
    // window.triggerSwiper0 = () => {
    //   this.goto()
    // }
    // window.triggerSwiper1 = () => {
    //   this.play()
    // }
    // window.triggerSwiper2 = () => {
    //   this.stop()
    // }
  },
  methods: {
    // setValue(id, value) {
    //   document.querySelector(id) && (document.querySelector(id).innerHTML = value)
    // },
    beforeChange(from, to) {
      console.log(from, to)
      // this.setValue('#valueSwiper0', from)
      // this.setValue('#valueSwiper1', to)
    },
    afterChange(from, to) {
      console.log(from, to)
      // this.setValue('#valueSwiper2', from)
      // this.setValue('#valueSwiper3', to)
    },
    // fn(index) {
    //   this.setValue('#valueSwiper4', index)
    // },
    // goto() {
    //   this.$refs.swiper.goto(2)
    // },
    // play() {
    //   this.$refs.swiper.play()
    // },
    // stop() {
    //   this.$refs.swiper.stop()
    // },
  },
}

</script>

<style>
.md-example-child-swiper-0 {
  height: 250px;
}
.md-example-child-swiper-0 .banner-item {
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
