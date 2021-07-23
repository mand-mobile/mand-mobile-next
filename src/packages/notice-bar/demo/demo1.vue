<template>
  <div
    class="
      md-example-child
      md-example-child-notice-bar
      md-example-child-notice-bar-1
    "
  >
    <md-notice-bar mode="closable" icon="security">
      为了确保您的资金安全，请设置支付密码
    </md-notice-bar>
  </div>
</template>

<script lang="ts">
import { NoticeBar } from 'mand-mobile-next/notice-bar'

export default {
  name: 'NoticeBarDemo',
  /* DELETE */
  title: '设置图标',
  titleEnUS: 'With icon',
  background: '#fff',
  /* DELETE */
  components: {
    [NoticeBar.name]: NoticeBar,
  },
}
</script>
