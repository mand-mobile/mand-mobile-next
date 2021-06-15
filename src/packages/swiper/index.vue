<template>
  <div
    class="md-swiper"
    :class="{
      'md-swiper-vertical': isVertical,
      'md-swiper-fade': transition === 'fade',
    }"
  >
    <div ref="wrapper" class="md-swiper-box">
      <div class="md-swiper-container">
        <slot></slot>
      </div>
    </div>
    <div
      v-if="indicatorCount > 1 && hasDots"
      class="md-swiper-indicators"
      :class="{ disabled: !hasDots }"
    >
      <template
        v-for="index in indicatorCount"
        :key="index"
      >
        <div
          class="md-swiper-indicator"
          :class="{
            'md-swiper-indicator-active':
              index - 1 === currentIndex,
          }"
        ></div>
      </template>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import {
  swiperProps,
  useSwiper,
  BEFORE_CHANGE,
  AFTER_CHANGE,
} from './use-swiper'

export default defineComponent({
  name: 'MdSwiper',
  props: swiperProps,
  emits: [BEFORE_CHANGE, AFTER_CHANGE],
  setup(props) {
    const {
      indicatorCount,
      wrapRef: wrapper,
      currentIndex,
      getSwiperInstance,
      isVertical,
    } = useSwiper(props)

    return {
      indicatorCount,
      currentIndex,

      wrapper,

      getSwiperInstance,
      isVertical,
    }
  },
})
</script>

<style lang="stylus">
.md-swiper-box
  min-height 1px
  overflow hidden
  will-change tranform
.md-swiper, .md-swiper-box
  width 100%
  height 100%
  position relative
  &.disabled
    visibility hidden
  &.md-swiper-fade
    .md-swiper-container
      position static
    .md-swiper-item
      position absolute
      opacity 0
      top 0
      left 0
  &.md-swiper-vertical
    .md-swiper-container
      width 100%
      height auto
      box-orient vertical
      flex-direction column
    .md-swiper-indicators
      flex-direction column
      right 20px
      left auto
      bottom auto
      top 50%
      transform translate(0, -50%)
      &.disabled
        visibility hidden
      .md-swiper-indicator
        width 4px
        height 16px
        margin 2.5px 0

.md-swiper-container
  height 100%
  width auto
  position relative
  display flex
  box-sizing content-box

.md-swiper-indicators
  position absolute
  bottom 20px
  left 50%
  display flex
  transform translateX(-50%)
  z-index 5

.md-swiper-indicator
  width 16px
  height 4px
  display inline-block
  background #ddd
  margin 0 3px
  &.md-swiper-indicator-active
    background swiper-indicator-fill
</style>
