<template>
  <div class="md-example-child md-example-child-skeleton md-example-child-skeleton-1">
    <md-skeleton avatar title></md-skeleton>
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
  'zh-CN': {
    title: '组合骨架',
  },
  'en-US': {
    title: 'Combined skeleton',
  },
}
// #endregion ignore

</script>

<style>
.md-example-child-skeleton-1 {
  margin: 30px 0;
}
</style>
