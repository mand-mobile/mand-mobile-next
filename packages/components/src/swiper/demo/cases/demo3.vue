<template>
  <div class="md-example-child md-example-child-swiper md-example-child-swiper-3">
    <md-swiper>
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

<script>
import Swiper from 'mand-mobile/lib/swiper'
import SwiperItem from 'mand-mobile/lib/swiper/swiper-item'
import mulit from 'mand-mobile/lib/swiper/demo/data/mulit-item'

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
}

</script>

<style>
.md-example-child-swiper-3 .md-swiper {
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
