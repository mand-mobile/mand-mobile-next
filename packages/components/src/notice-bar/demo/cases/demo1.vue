<template>
  <div class="md-example-child md-example-child-notice-bar md-example-child-notice-bar-1">
    <md-notice-bar
      mode="closable"
      icon="security"
    >
      为了确保您的资金安全，请设置支付密码
    </md-notice-bar>
  </div>
</template>

<script>
import NoticeBar from 'mand-mobile/lib/notice-bar'

export default {
  components: {
    'md-notice-bar': NoticeBar,
  },
}
// #region ignore
export const metaInfo = {
  'zh-CN': {
    title: '设置图标',
  },
  'en-US': {
    title: 'With icon',
  },
}
// #endregion ignore

</script>
