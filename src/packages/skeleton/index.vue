<template>
  <div v-if="loading" class="md-skeleton">
    <div
      v-if="avatar"
      :class="{
        'md-skeleton-avatar': true,
        'md-skeleton-avatar-large': avatarSize === 'lg',
        'md-skeleton-avatar-small': avatarSize === 'sm',
      }"
    ></div>
    <div class="md-skeleton-content">
      <h4
        v-if="title"
        class="md-skeleton-title"
        :style="{ width: getTitleWidth() }"
      />
      <div
        v-for="index in row"
        :key="index"
        class="md-skeleton-row"
        :style="{
          width:
            index === row ? '60%' : getRowWidth(index - 1),
        }"
      ></div>
    </div>
  </div>
  <div v-else>
    <slot></slot>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { skeletonProps, useSkeleton } from './use-skeleton'

export default defineComponent({
  name: 'MdSkeleton',
  props: skeletonProps,
  setup(props) {
    return {
      ...useSkeleton(props),
    }
  },
})
</script>

<style lang="stylus">
placeHolder()
  animation-duration 2s
  animation-fill-mode forwards
  animation-iteration-count infinite
  animation-name placeHolderShimmer
  animation-timing-function linear
  background linear-gradient(to right, #F3F3F6 8%, #F8FAFF 18%, #F3F3F6 33%)
  background-size 1000px 104px

.md-skeleton
  box-sizing border-box
  display flex
  .md-skeleton-avatar
    width 80px
    height 80px
    margin-right 32px
    border-radius 50%
    placeHolder()
    &.md-skeleton-avatar-large
      width 96px
      height 96px
    &.md-skeleton-avatar-small
      width 64px
      height 64px
  .md-skeleton-content
    flex 1
  .md-skeleton-title, .md-skeleton-row
    box-sizing border-box
    height 32px
    margin-bottom 24px
    border 0
    border-radius 0
    placeHolder()
    &:last-child
      margin-bottom 0

@keyframes placeHolderShimmer
  0%
    background-position -468px 0
  100%
    background-position 468px 0
</style>
