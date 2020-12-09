<template>
  <div class="md-example-child md-example-child-result-page md-example-child-result-page-0">
    <md-result-page
      type="lost">
    </md-result-page>
  </div>
</template>

<script>
import ResultPage from 'mand-mobile/lib/result-page'

export default {
  components: {
    'md-result-page': ResultPage,
  },
}
// #region ignore
export const metaInfo = {
  title: '404',
}
// #endregion ignore

</script>

<style>
.md-example-child-result-page-0 {
  background: #FFF;
}
</style>