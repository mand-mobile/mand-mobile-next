<script lang="ts">
export default {
  name: 'ResultPageDemo',
  title: '网络异常',
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
      md-example-child-result-page-1
    "
  >
    <md-result-page
      type="network"
      subtext="点击屏幕，重新加载"
    >
    </md-result-page>
  </div>
</template>
