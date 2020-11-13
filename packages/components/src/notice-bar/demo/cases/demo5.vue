<template>
  <div class="md-example-child md-example-child-notice-bar md-example-child-notice-bar-5">
    <md-notice-bar
      mode="link"
      icon="security"
      multi-rows
    >
      为了确保您的资金安全，请设置支付密码。为了确保您的资金安全，请设置支付密码。为了确保您的资金安全，请设置支付密码。
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
    title: '多行显示',
  },
  'en-US': {
    title: 'Multi-line display',
  },
}
// #endregion ignore

</script>
