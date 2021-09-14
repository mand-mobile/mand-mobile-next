<template>
  <div class="md-swiper-drawer">
    <div ref="contentRef" class="md-swiper-drawer__content">
      <slot></slot>
    </div>
    <div
      ref="operationRef"
      class="md-swiper-drawer__operation"
    >
      <div class="delete">
        <slot name="operation">删除</slot>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useDrawer } from './use-drawer'

export default defineComponent({
  name: 'MdSwiperDrawer',
  setup() {
    const { contentRef, operationRef } = useDrawer()

    return { contentRef, operationRef }
  },
})
</script>

<style lang="stylus">
.md-swiper-drawer
  position relative
  // overflow hidden
  .md-swiper-drawer__content
    position relative
    z-index 2
    background #fff
  .md-swiper-drawer__operation
    position absolute
    top 0
    right 0
    width 160px
    height 100%
    z-index 1
    .delete
      height 100%
      display flex
      justify-content center
      align-items center
      background #FF6666
      color #ffffff
</style>
