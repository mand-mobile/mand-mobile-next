<template>
  <div
    class="
      md-example-child
      md-example-child-notice-bar
      md-example-child-notice-bar-4
    "
  >
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
      style="margin-top: 10px"
    >
      福利来啦，7日免息券发放中！
    </md-notice-bar>
  </div>
</template>

<script lang="ts">
import { NoticeBar } from 'mand-mobile-next/notice-bar'

export default {
  name: 'NoticeBarDemo',
  /* DELETE */
  title: '样式',
  titleEnUS: 'Theme',
  background: '#fff',
  /* DELETE */
  components: {
    [NoticeBar.name]: NoticeBar,
  },
}
</script>

<style lang="stylus">
.md-example-child-notice-bar-4
  flex-direction column
  .md-notice-bar
    width 100%
</style>
