<template>
  <div class="md-example-child md-example-child-notice-bar md-example-child-notice-bar-7">
    <md-notice-bar scrollable>
      <md-icon slot="left" class="md-notice-demo-icon md-notice-demo-icon-left" name="security"></md-icon>
      {{ content }}
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
  data() {
    return {
      content: '为了确保您的资金安全，请设置支付密码',
    }
  },
  mounted() {
    setTimeout(() => {
      this.content = '为了确保您的资金安全，请设置支付密码;为了确保您的资金安全，请设置支付密码'
    }, 2000)

    setTimeout(() => {
      this.content = '为了确保您的资金安全，请设置支付密码'
    }, 8000)
  },
}
// #region ignore
export const metaInfo = {
  'zh-CN': {
    title: '动态插槽内容',
  },
  'en-US': {
    title: 'Dynamic slot content',
  },
}
// #endregion ignore

</script>
