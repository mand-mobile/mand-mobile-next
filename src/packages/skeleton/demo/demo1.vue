<script lang="ts">
export default {
  name: 'SkeletonDemo',
  title: '组合骨架',
  titleEnUS: 'Combined skeleton',
}
</script>
<script setup lang="ts">
import MdSkeleton from 'mand-mobile-next/skeleton'
</script>
<template>
  <div
    class="
      md-example-child
      md-example-child-skeleton
      md-example-child-skeleton-1
    "
  >
    <md-skeleton avatar title />
  </div>
</template>

<style lang="stylus">
.md-example-child-skeleton-1
  margin 30px 0
</style>
