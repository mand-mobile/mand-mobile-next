<template>
  <div class="md-example-child md-example-child-result-page md-example-child-result-page-0">
    <md-result-page
      type="lost">
    </md-result-page>
  </div>
</template>

<script>
import ResultPage from 'mand-mobile/result-page'

export default {
  name: 'result-page-demo',
  /* DELETE */
  title: '404',
  /* DELETE */
  components: {
    'md-result-page': ResultPage,
  },
}

</script>

<style lang="stylus">
.md-example-child-result-page-0
  background #FFF
</style>