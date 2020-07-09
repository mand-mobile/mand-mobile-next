<template>
  <div class="md-example-child md-example-child-notice-bar md-example-child-notice-bar-7">
    <md-notice-bar>
      <md-icon slot="left" class="md-notice-demo-icon md-notice-demo-icon-left" name="security"></md-icon>
      为了确保您的资金安全，请设置支付密码
    </md-notice-bar>
  </div>
</template>

<script>
import Icon from 'mand-mobile/icon'
// #ifdef H5
import NoticeBar from 'mand-mobile/notice-bar'
// #endif
// #ifdef MP-WEIXIN
import NoticeBar from "mand-mobile/notice-bar/index.uni"
// #endif

export default {
  name: 'notice-bar-demo',
  /* DELETE */
  title: '使用插槽自定义',
  titleEnUS: 'Customize',
  background: '#fff',
  /* DELETE */
  components: {
    'md-notice-bar': NoticeBar,
    'md-icon': Icon,
  },
}

</script>
