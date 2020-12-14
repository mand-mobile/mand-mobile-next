<template>
  <div class="md-example-child md-example-child-skeleton md-example-child-skeleton-0">
    <md-skeleton title loading></md-skeleton>
  </div>
</template>

<script>
import Skeleton from 'mand-mobile/lib/skeleton'

export default {
  components: {
    'md-skeleton': Skeleton,
  },
}

// #region ignore
export const metaInfo = {
  title: '基础骨架屏',
  describe: '3s后加载完成',
}
// #endregion ignore

</script>

<style>
.md-example-child-skeleton-0 {
  margin: 30px 0;
}
</style>
