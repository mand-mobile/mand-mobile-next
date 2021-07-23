<script lang="ts">
export default {
  name: 'SwiperDemo',
  title: '横向轮播',
}
</script>
<script setup lang="ts">
import MdSwiper from 'mand-mobile-next/swiper'

const pageData = [
  {
    color: '#4390EE',
    text: '给时光以生命，给岁月以文明。',
  },
  {
    color: '#364d79',
    text: '你的无畏来源于无知。',
  },
  {
    color: '#CA4040',
    text: '一切都将逝去，只有死神永生。',
  },
]
</script>

<template>
  <md-swiper
    :has-dots="true"
    :autoplay="3000"
    :default-index="1"
  >
    <div
      v-for="(num, index) in pageData"
      :key="index"
      class="slide-page"
      :class="'page' + index"
      :style="{
        backgroundColor: num.color,
      }"
    >
      {{ num.text }}
    </div>
  </md-swiper>
</template>

<style lang="stylus">
.slide-page
  // display inline-block
  width 100%
  line-height 250px
  text-align center
  font-size 26px
  transform translate3d(0,0,0)
  backface-visibility hidden
  color #fff
  &.page1
    background-color #D6EADF
  &.page2
    background-color #DDA789
  &.page3
    background-color #C3D899
  &.page4
    background-color #F2D4A7
// .md-swiper-container
//   height 250px
.md-swiper-fade .slide-page
  position absolute
  opacity 0
  top 0
  left 0
</style>
