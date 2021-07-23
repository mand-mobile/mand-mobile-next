<template>
  <div
    class="
      md-example-child
      md-example-child-notice-bar
      md-example-child-notice-bar-3
    "
  >
    <md-notice-bar round>
      为了确保您的资金安全，请设置支付密码
    </md-notice-bar>
  </div>
</template>

<script lang="ts">
import { NoticeBar } from 'mand-mobile-next/notice-bar'

export default {
  name: 'NoticeBarDemo',
  /* DELETE */
  title: '圆角',
  titleEnUS: 'Round',
  background: '#fff',
  /* DELETE */
  components: {
    [NoticeBar.name]: NoticeBar,
  },
}
</script>
