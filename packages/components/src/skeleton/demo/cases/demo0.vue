<template>
  <div class="md-example-child md-example-child-skeleton md-example-child-skeleton-0">
    <md-skeleton title :loading="loading">
    </md-skeleton>
  </div>
</template>

<script>import Skeleton from '../../index'
export default {
  name: 'skeleton-demo',
  data() {
    return {
      loading: true,
    }
  },
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
