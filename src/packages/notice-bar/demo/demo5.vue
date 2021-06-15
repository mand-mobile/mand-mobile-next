<template>
  <div
    class="
      md-example-child
      md-example-child-notice-bar
      md-example-child-notice-bar-5
    "
  >
    <md-notice-bar mode="link" icon="security" multi-rows>
      为了确保您的资金安全，请设置支付密码。为了确保您的资金安全，请设置支付密码。为了确保您的资金安全，请设置支付密码。
    </md-notice-bar>
  </div>
</template>

<script lang="ts">
import { NoticeBar } from 'mand-mobile/notice-bar'

export default {
  name: 'NoticeBarDemo',
  /* DELETE */
  title: '多行显示',
  titleEnUS: 'Multi-line display',
  background: '#fff',
  /* DELETE */
  components: {
    [NoticeBar.name]: NoticeBar,
  },
}
</script>
