<template>
  <div class="md-example-child md-example-child-notice-bar md-example-child-notice-bar-4">
    <md-notice-bar
      icon="warn"
      mode="closable"
      type="warning"
    >
      该银行3:00-12:00系统维护，请更换其他银行卡
    </md-notice-bar>
    <md-notice-bar
      icon="coupon"
      mode="link"
      type="activity"
      :style="{'margin-top': '10px'}"
    >
      福利来啦，7日免息券发放中！
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
  title: '样式',
  titleEnUS: 'Theme',
  background: '#fff',
  /* DELETE */
  components: {
    'md-notice-bar': NoticeBar,
  },
}

</script>

<style lang="stylus">
.md-example-child-notice-bar-4
  flex-direction column
  .md-notice-bar
    width 100%
</style>
