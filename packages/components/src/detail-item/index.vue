<template>
  <div class="md-detail-item" :class="{ 'md-detail-item--is-bold': bold }">
    <div class="md-detail-item_title" v-text="title"></div>
    <div class="md-detail-item_content">
      <slot>{{ content }}</slot>
    </div>
  </div>
</template>

<script>export default {
  name: 'md-detail-item',

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
}
</script>

<style lang="stylus">
.md-detail-item
  display flex
  align-items center
  justify-content space-between
  line-height 1.35
  font-size md-detail-item-font-size
  padding-top md-detail-item-gap
  padding-bottom md-detail-item-gap

  &_title
    flex-shrink 0
    color md-detail-item-title-color

  &_content
    flex 1 1 0%
    color md-detail-item-content-color
    display flex
    align-items center
    justify-content flex-end
    margin-left md-h-gap-sm

.md-detail-item
  &--is-bold
    .md-detail-item_title,
    .md-detail-item_content
      font-weight bold
      color md-detail-item-content-color
</style>
