<template>
  <div class="md-example-child md-example-child-swiper md-example-child-swiper-2">
    <md-swiper
      :autoplay="0"
      transition="fade"
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
import Swiper from 'mand-mobile/lib/swiper'
import SwiperItem from 'mand-mobile/lib/swiper/swiper-item'
import simple from 'mand-mobile/lib/swiper/demo/data/simple'

export default {
  components: {
    'md-swiper': Swiper,
    'md-swiper-item': SwiperItem,
  },
  data() {
    return {
      simple,
    }
  },
}

</script>

<style>
.md-example-child-swiper-2 {
  height: 250px;
}
.md-example-child-swiper-2 .banner-item {
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
</style>
