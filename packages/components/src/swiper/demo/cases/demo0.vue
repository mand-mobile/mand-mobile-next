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
    <div class="operation">
      <md-button size="small" inline @click="play">{{active ? 'stop' : 'play'}}</md-button>
      <md-button type="primary" size="small" inline @click="goto">goto(2)</md-button>
    </div>
    <div class="status">
      beforeChange - from: {{beforeChangeFrom}}, to: {{beforeChangeTo}} <br/>
      afterChange - from: {{afterChangeFrom}}, to: {{afterChangeTo}}
    </div>
  </div>
</template>

<script>
import Swiper from 'mand-mobile/lib/swiper'
import SwiperItem from 'mand-mobile/lib/swiper/swiper-item'
import simple from 'mand-mobile/lib/swiper/demo/data/simple'
import Button from 'mand-mobile/lib/button'

export const metaInfo = {}

export default {
  components: {
    'md-swiper': Swiper,
    'md-swiper-item': SwiperItem,
    'md-button': Button,
  },
  data() {
    return {
      simple,
      beforeChangeFrom: 0,
      beforeChangeTo: 0,
      afterChangeFrom: 0,
      afterChangeTo: 0,
      active: false,
    }
  },
  methods: {
    beforeChange(from, to) {
      this.beforeChangeFrom = from
      this.beforeChangeTo = to
    },
    afterChange(from, to) {
      this.afterChangeFrom = from
      this.afterChangeTo = to
    },
    goto() {
      this.$refs.swiper.goto(2)
    },
    play() {
      this.active = !this.active
      this.active ? this.$refs.swiper.play() : this.$refs.swiper.stop()
    },
  },
}

</script>

<style>
/* .md-example-child-swiper-0 .md-swiper {
  height: 250px;
} */
.md-example-child-swiper-0 .banner-item {
  float: left;
  width: 100%;
  height: 250px;
  display: flex;
  text-align: center;
  font-size: 28px;
  color: #FFF;
  box-align: center;
  align-items: center;
  box-pack: center;
  justify-content: center;
  text-decoration-line: none;
}
.md-example-child-swiper-0 .operation {
  margin-top: 20px;
}
.md-example-child-swiper-0 .status {
  margin-top: 20px;
  font-size: 22px;
}
</style>
