<script lang="ts">
export default {
  name: 'ResultPageDemo',
  title: '404',
}
</script>
<script setup lang="ts">
import MdResultPage from 'mand-mobile-next/result-page'
</script>

<template>
  <div
    class="
      md-example-child
      md-example-child-result-page
      md-example-child-result-page-0
    "
  >
    <md-result-page type="lost"> </md-result-page>
  </div>
</template>

<style lang="stylus">
.md-example-child-result-page
  background #FFF
</style>
