<template>
  <div class="md-example-child md-example-child-notice-bar md-example-child-notice-bar-7">
    <md-notice-bar>
      <md-icon slot="left" class="md-notice-demo-icon md-notice-demo-icon-left" name="security"></md-icon>
      为了确保您的资金安全，请设置支付密码
    </md-notice-bar>
  </div>
</template>

<script>
import Icon from 'mand-mobile/lib/icon'
import NoticeBar from 'mand-mobile/lib/notice-bar'

export default {
  components: {
    'md-notice-bar': NoticeBar,
    'md-icon': Icon,
  },
}
// #region ignore
export const metaInfo = {
  'zh-CN': {
    title: '使用插槽自定义',
  },
  'en-US': {
    title: 'Customize with slots',
  },
}
// #endregion ignore

</script>
