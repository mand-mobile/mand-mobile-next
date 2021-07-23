<script lang="ts">
export default {
  name: 'SwiperDemo',
  title: '每屏多内容',
}
</script>
<script setup lang="ts">
import MdSwiper from 'mand-mobile-next/swiper'

const colors = [
  [
    {
      color: '#4390EE',
      text: '引力波',
    },
    {
      color: '#CA4040',
      text: '智子',
    },
    {
      color: '#FF8604',
      text: '水滴',
    },
    {
      color: '#00CC00',
      text: '二向箔',
    },
    {
      color: '#0066CC',
      text: '飞刃',
    },
    {
      color: '#99CCCC',
      text: '碎星',
    },
  ],
  [
    {
      color: '#990033',
      text: '危机',
    },
    {
      color: '#CCFF66',
      text: '威摄',
    },
    {
      color: '#FF9900',
      text: '威摄后',
    },
    {
      color: '#FF9933',
      text: '广播',
    },
    {
      color: '#99CC33',
      text: '掩体',
    },
    {
      color: '#CC6699',
      text: '银河',
    },
  ],
  [
    {
      color: '#0099CC',
      text: '猜疑链',
    },
    {
      color: '#CCCCCC',
      text: '技术爆炸',
    },
    {
      color: '#FF6666',
      text: '黑暗森林',
    },
    {
      color: '#99CCCC',
      text: '地球',
    },
    {
      color: '#FFCC99',
      text: '三体',
    },
    {
      color: '#FFCCCC',
      text: '歌者',
    },
  ],
]
</script>

<template>
  <div
    class="
      md-example-child
      md-example-child-swiper
      md-example-child-swiper-3
    "
  >
    <md-swiper :has-dots="true" :autoplay="3000">
      <div
        v-for="(item, index) in colors"
        :key="index"
        class="slide-page"
        :class="'page' + index"
      >
        <ul>
          <li v-for="(sub, $index1) in item" :key="$index1">
            <span
              href="javascript:void(0)"
              class="banner-item"
              :style="{ background: `${sub.color}` }"
            >
              {{ sub.text }}
            </span>
          </li>
        </ul>
      </div>
    </md-swiper>
  </div>
</template>

<style lang="stylus">
.md-example-child-swiper-3
  height 250px
  ul
    display flex
    flex-wrap wrap
  li
    width 33.3%
    // height 125px
  .banner-item
    display flex
    width 100%
    heigth 125px
    line-height 125px
    display flex
    justify-content center
    align-items center
    font-size 28px
    color #FFF
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
