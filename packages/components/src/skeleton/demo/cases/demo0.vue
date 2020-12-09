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

</script>

<style>
.md-example-child-skeleton-0 {
  margin: 30px 0;
}
</style>
