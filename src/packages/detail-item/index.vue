<template>
  <div class="md-detail-item" :class="{ 'is-bold': bold }">
    <div class="md-detail-title" v-text="title"></div>
    <div class="md-detail-content">
      <slot>{{ content }}</slot>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
export default defineComponent({
  name: 'MdDetailItem',
  props: {
    title: {
      type: String,
      default: '',
    },
    content: {
      type: [String, Number],
      default: '',
    },
    bold: {
      type: Boolean,
      default: false,
    },
  },
})
</script>

<style lang="stylus">
@import './index.styl'

.md-detail-item
  display flex
  align-items center
  justify-content space-between
  line-height 1.35
  font-size var(--md-detail-item-font-size)
  padding-top var(--md-detail-item-gap)
  padding-bottom var(--md-detail-item-gap)

.md-detail-title
  flex-shrink 0
  color var(--md-detail-item-title-color)

.md-detail-content
  flex 1 1 0%
  color var(--md-detail-item-content-color)
  display flex
  align-items center
  justify-content flex-end
  margin-left var(--md-h-gap-sm)

.md-detail-item
  &.is-bold
    .md-detail-title,
    .md-detail-content
      font-weight bold
      color var(--md-detail-item-content-color)
</style>
