<template>
  <div class="md-example-child md-example-child-notice-bar md-example-child-notice-bar-6">
    <md-notice-bar
      mode="closable"
      icon="volumn"
      scrollable
    >
      为了确保您的资金安全，请设置支付密码为了确保您的资金安全，请设置支付密码为了确保您的资金安全，请设置支付密码
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
    title: '滚动播放',
  },
  'en-US': {
    title: 'Scrolling play',
  },
}
// #endregion ignore

</script>
