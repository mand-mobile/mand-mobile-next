<script lang="ts">
export default {
  name: 'ResultPageDemo',
  title: '自定义图案',
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
      md-example-child-result-page-3
    "
  >
    <md-result-page
      class="customized"
      img-url="//manhattan.didistatic.com/static/manhattan/do1_JX7bcfXqLpStKRv31xlp"
      text="不太确定自己错在了哪里..."
      subtext="要不然刷新试试？"
    >
    </md-result-page>
  </div>
</template>
