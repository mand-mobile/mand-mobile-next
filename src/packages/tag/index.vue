<template>
  <div ref="tagRef" class="md-tag">
    <template v-if="shape === 'quarter'">
      <div :class="computedClass">
        <div class="quarter-content">
          <slot></slot>
        </div>
        <div class="quarter-bg" :style="colorStyle"></div>
      </div>
    </template>
    <template v-else-if="shape === 'coupon'">
      <div :class="computedClass">
        <div class="coupon-container" :style="colorStyle">
          <div
            v-if="shape === 'coupon'"
            class="left-coupon"
            :style="{
              background: fillColor
                ? 'radial-gradient(circle at left, transparent 33%, ' +
                  fillColor +
                  ' 33%)'
                : '',
            }"
          ></div>
          <slot></slot>
          <div
            v-if="shape === 'coupon'"
            class="right-coupon"
            :style="{
              background: fillColor
                ? 'radial-gradient(circle at right, transparent 33%, ' +
                  fillColor +
                  ' 33%)'
                : '',
            }"
          ></div>
        </div>
      </div>
    </template>
    <template v-else>
      <div
        :class="computedClass"
        :style="[colorStyle, sizeStyle]"
      >
        <slot></slot>
      </div>
    </template>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { tagProps, useTag } from './use-tag'
export default defineComponent({
  name: 'MdTag',
  props: tagProps,
  setup(props) {
    const { sizeStyle, computedClass, tagRef, colorStyle } =
      useTag(props)
    return {
      sizeStyle,
      computedClass,
      tagRef,
      colorStyle,
    }
  },
})
</script>

<style lang="stylus">
.md-tag
  color var(--md-color-text-base)
  font-size 28px
  text-align center
  display inline-block
  -webkit-user-select none

  .default
    background rgba(0,0,0,0)
    color var(--md-tag-color)
    border-color var(--md-tag-color)
  .shape-square
    padding 0 12px
    border-radius 50%
  .shape-square
    padding 0 12px
    border-radius 0
  .shape-fillet
    padding 2px 8px
    border-radius var(--md-tag-fillet-radius)
  .shape-quarter
    position relative
    display flex
    width 56px
    height 56px
    background transparent !important
    overflow hidden
    .quarter-content
      position relative
      left 10%
      bottom 10%
      display flex
      flex 1
      z-index 2
      justify-content center
      align-items center
      // transform translate(-50%, -75%)
    .quarter-bg
      position absolute
      top -100%
      left 0
      width 200%
      height 200%
      border-radius var(--md-radius-circle)
    .quarter-wrap
      display inline-block
      padding 16px 12px 10px 26px
    .quarter-wrap-hidden
      visibility hidden
      display inline-block
      padding 16px 12px 10px 26px

    &.size-small
      width 40px
      height 40px
    &.size-tiny
      width 24px
      height 24px

  .shape-coupon
    position relative
    padding 0 10px
    background transparent !important
    .coupon-container
      padding 2px 0
    .left-coupon,
    .right-coupon
      position absolute
      top 0
      width 10px
      height 100%
    .left-coupon
      left 0
    .right-coupon
      right 0

    &.size-small
      padding 0 8px
      .left-coupon,
      .right-coupon
        width 8px
    &.size-tiny
      padding 0 5px
      .left-coupon,
      .right-coupon
        width 5px

  .shape-bubble
    width 50px
    padding 6px 0
    border-radius var(--md-radius-circle)
    border-bottom-left-radius 0
    box-sizing border-box

    &.size-small
      width 38px
      padding 3px 0
    &.size-tiny
      width 24px
      padding 2px 0

  .size-large
    font-size var(--md-tag-large-font-size)
  .size-small
    font-size var(--md-tag-small-font-size)
  .size-tiny
    font-size var(--md-tag-tiny-font-size)
  .type-fill
    color var(--md-color-text-base-inverse)
    background var(--md-tag-color)
  .type-ghost
    border 1px solid var(--md-tag-color)
    background rgba(0,0,0,0)

  .font-weight-normal
    font-weight normal
  .font-weight-bold
    font-weight bold
  .font-weight-bolder
    font-weight bolder

  .md-icon.icon-font
    font-size inherit
    transform scale(1.2)
</style>
