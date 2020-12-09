<template>
  <div class="md-example-child md-example-child-notice-bar md-example-child-notice-bar-2">
    <md-notice-bar :time="5000">为了确保您的资金安全，请设置支付密码</md-notice-bar>
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
    title: '设置时间',
    describe: '5s后隐藏',
  },
  'en-US': {
    title: 'Setting dwell time',
    describe: 'Hidden after 5s',
  },
}
// #endregion ignore

</script>