<template>
  <div class="md-example-child md-example-child-swiper md-example-child-swiper-1">
    <md-swiper
      :dragable="false"
      :autoplay="3000"
      transition="slideY"
    >
      <md-swiper-item :key="$index" v-for="(item, $index) in simple">
        <div class="banner-item" :style="{'background': `${item.color}`}">
          {{item.text}}
        </div>
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
// #region ignore
export const metaInfo = {
  'zh-CN': {
    title: '进度变化动效',
  },
  'en-US': {
    title: 'Transition of progress',
  },
}
// #endregion ignore

</script>

<style>
.md-example-child-swiper-1 {
  height: 250px;
}
.md-example-child-swiper-1 .banner-item {
  float: left;
  width: 100%;
  height: 100%;
  display: flex;
  /* line-height: 250px; */
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
