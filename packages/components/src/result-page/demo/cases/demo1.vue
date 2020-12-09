<template>
  <div class="md-example-child md-example-child-result-page md-example-child-result-page-1">
    <md-result-page
      type="network"
      subtext="点击屏幕，重新加载">
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
  'zh-CN': {
    title: '网络异常',
  },
  'en-US': {
    title: 'Network error',
  },
}
// #endregion ignore

</script>

<style>
.md-example-child-result-page-1 {
  background: #FFF;
}
</style>