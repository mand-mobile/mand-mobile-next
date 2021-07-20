<template>
  <div
    class="
      md-example-child
      md-example-child-notice-bar
      md-example-child-notice-bar-0
    "
  >
    <md-notice-bar>
      为了确保您的资金安全，请设置支付密码
    </md-notice-bar>
  </div>
</template>

<script lang="ts">
import { NoticeBar } from 'mand-mobile/notice-bar'

export default {
  name: 'NoticeBarDemo',
  title: '基本',
  /* DELETE */
  background: '#fff',
  /* DELETE */
  components: {
    [NoticeBar.name]: NoticeBar,
  },
}
</script>
