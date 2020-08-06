<template>
  <div class="md-example-child md-example-child-skeleton md-example-child-skeleton-1">
    <md-skeleton avatar title>
    </md-skeleton>
  </div>
</template>

<script>import Skeleton from '../../index'
export default {
  name: 'skeleton-demo',
  /* DELETE */
  title: '组合骨架',
  titleEnUS: 'Combined skeleton',
  /* DELETE */
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
.md-example-child-skeleton-1 {
  margin: 30px 0;
}
</style>
