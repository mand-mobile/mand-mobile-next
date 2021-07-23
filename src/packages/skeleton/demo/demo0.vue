<script lang="ts">
export default {
  name: 'SkeletonDemo',
  title: '基础',
}
</script>
<script setup lang="ts">
import { ref } from 'vue'
import MdSkeleton from 'mand-mobile-next/skeleton'

const loading = ref(true)
</script>
<template>
  <div
    class="
      md-example-child
      md-example-child-skeleton
      md-example-child-skeleton-0
    "
  >
    <md-skeleton title :loading="loading" />
  </div>
</template>
<style lang="stylus">
.md-example-child-skeleton-0
  margin 30px 0
</style>
