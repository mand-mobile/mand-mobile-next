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
// #ifdef H5
import NoticeBar from 'mand-mobile/notice-bar'
// #endif
// #ifdef MP-WEIXIN
import NoticeBar from "mand-mobile/notice-bar/index.uni"
// #endif

export default {
  name: 'notice-bar-demo',
  /* DELETE */
  title: '滚动播放',
  titleEnUS: 'Scroll play',
  background: '#fff',
  /* DELETE */
  components: {
    'md-notice-bar': NoticeBar,
  },
}

</script>
