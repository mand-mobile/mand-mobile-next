<template>
  <div
    class="
      md-example-child
      md-example-child-notice-bar
      md-example-child-notice-bar-2
    "
  >
    <md-notice-bar :time="5000">
      为了确保您的资金安全，请设置支付密码
    </md-notice-bar>
  </div>
</template>

<script lang="ts">
import { NoticeBar } from 'mand-mobile-next/notice-bar'

export default {
  name: 'NoticeBarDemo',
  /* DELETE */
  title: '设置时间',
  titleEnUS: 'Setting dwell time',
  describe: '5s后隐藏',
  describeEnUS: 'Hidden after 5s',
  background: '#fff',
  /* DELETE */
  components: {
    [NoticeBar.name]: NoticeBar,
  },
}
</script>
