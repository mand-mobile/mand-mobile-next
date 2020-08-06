<template>
  <div class="md-scroll-view-more">
    <template v-if="!isFinished">
      {{ loadingText }}
    </template>
    <template v-else>
      {{ finishedText }}
    </template>
  </div>
</template>

<script>export default {
  name: 'md-scroll-view-more',
  props: {
    loadingText: {
      type: String,
      default: '更多加载中...',
    },
    finishedText: {
      type: String,
      default: '全部已加载',
    },
    isFinished: {
      type: Boolean,
      default: false,
    },
  },
}
</script>

<style lang="stylus">
.md-scroll-view-more
  padding md-v-gap-lg 0
  font-size md-font-minor-large
  text-align center
  color md-color-text-caption
</style>