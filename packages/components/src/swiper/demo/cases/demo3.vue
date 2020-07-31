<template>
  <div class="md-example-child md-example-child-swiper md-example-child-swiper-3">
    <md-swiper
      ref="swiper"
      @before-change="beforeChange"
      @after-change="afterChange"
    >
      <md-swiper-item :key="$index" v-for="(item, $index) in mulit">
        <ul>
          <li :key="$index1" v-for="(sub, $index1) in item" class="block">
            <a href="javascript:void(0)" class="banner-item" :style="{'background': `${sub.color}`}">{{sub.text}}</a>
          </li>
        </ul>
      </md-swiper-item>
    </md-swiper>
  </div>
</template>

<script>import Swiper from '../../index'
import SwiperItem from '../../swiper-item'
import mulit from '../../demo/data/mulit-item'

export default {
  name: 'swiper-demo',
  components: {
    'md-swiper': Swiper,
    'md-swiper-item': SwiperItem,
  },
  data() {
    return {
      mulit,
    }
  },
  mounted() {
    // window.triggerSwiper4 = () => {
    //   this.goto()
    // }
  },
  methods: {
    // setValue(id, value) {
    //   document.querySelector(id) && (document.querySelector(id).innerHTML = value)
    // },
    // beforeChange(from, to) {
    // this.setValue('#valueSwiper15', from)
    // this.setValue('#valueSwiper16', to)
    // },
    // afterChange(from, to) {
    // this.setValue('#valueSwiper17', from)
    // this.setValue('#valueSwiper18', to)
    // },
    goto() {
      this.$refs.swiper.goto(2)
    },
  },
}
</script>

<style lang="stylus">
.md-example-child-swiper-3 {
  height: 250px;
}
.md-example-child-swiper-3 .block {
  float: left;
  width: 33%;
  height: 125px;
  list-style: none;
}
.md-example-child-swiper-3 .banner-item {
  float: left;
  width: 100%;
  height: 100%;
  line-height: 125px;
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
