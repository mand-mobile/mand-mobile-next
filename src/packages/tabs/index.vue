<template>
  <div class="md-tabs">
    <md-tab-bar
      ref="tabBar"
      :model-value="tabItems[currentIndex]?.name || ''"
      :items="tabItems"
      :has-ink="hasInk"
      :ink-length="inkLength"
      @change="changeHandler"
    />
    <md-swiper
      ref="swiper"
      :autoplay="0"
      :is-loop="false"
      :has-dots="false"
      :is-prevent="false"
      @before-change="swiperChangeHandler"
    >
      <slot></slot>
    </md-swiper>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import MdSwiper from 'mand-mobile-next/swiper'
import MdTabBar from 'mand-mobile-next/tab-bar'
import { CHANGE_EVENT } from 'mand-mobile-next/utils'
import { useTabs, tabsProps } from './use-tabs'

export default defineComponent({
  name: 'MdTabs',
  components: { MdSwiper, MdTabBar },
  props: tabsProps,
  emits: [CHANGE_EVENT],
  setup(props, context) {
    const {
      tabItems,
      swiperRef: swiper,
      currentIndex,
      changeHandler,
      swiperChangeHandler,
    } = useTabs(props, context)

    return {
      tabItems,
      swiper,
      currentIndex,
      changeHandler,
      swiperChangeHandler,
    }
  },
})
</script>

<style lang="stylus"></style>
