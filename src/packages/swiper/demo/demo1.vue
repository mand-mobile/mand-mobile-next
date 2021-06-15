<script lang="ts">
export default {
  name: 'SwiperDemo',
  title: '纵向轮播',
}
</script>
<script setup lang="ts">
import MdSwiper from 'mand-mobile/swiper'

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

const beforeChange = (from: number, to: number) => {
  console.log('from:' + from + '\n')
  console.log('to:' + to)
}
</script>

<template>
  <md-swiper
    class="md-example-child-swiper-1"
    :has-dots="true"
    :autoplay="5000"
    :dragable="false"
    transition="slideY"
    @before-change="beforeChange"
  >
    <div
      v-for="num in pageData"
      :key="num.text"
      class="slide-page"
      :class="'page' + num.color"
      :style="{
        backgroundColor: num.color,
      }"
    >
      {{ num.text }}
    </div>
  </md-swiper>
</template>

<style lang="stylus">
.md-example-child-swiper-1
  height 250px !important
</style>
