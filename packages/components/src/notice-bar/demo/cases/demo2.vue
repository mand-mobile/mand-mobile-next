<template>
  <div class="md-example-child md-example-child-notice-bar md-example-child-notice-bar-2">
    <md-notice-bar :time="5000">为了确保您的资金安全，请设置支付密码</md-notice-bar>
  </div>
</template>

<script>
// #ifdef H5
import NoticeBar from 'mand-mobile/notice-bar'
// #endif
// #ifdef MP-WEIXIN
import NoticeBar from "mand-mobile/notice-bar/index.uni"
// #endif

export default {
  name: 'notice-bar-demo',
  /* DELETE */
  title: '设置时间',
  titleEnUS: 'Setting dwell time',
  describe: '5s后隐藏',
  describeEnUS: 'Hidden after 5s',
  background: '#fff',
  /* DELETE */
  components: {
    'md-notice-bar': NoticeBar,
  },
}

</script>