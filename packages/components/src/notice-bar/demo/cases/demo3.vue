<template>
  <div class="md-example-child md-example-child-notice-bar md-example-child-notice-bar-3">
    <md-notice-bar round>为了确保您的资金安全，请设置支付密码</md-notice-bar>
  </div>
</template>

<script>import NoticeBar from '../../index'

export default {
  name: 'notice-bar-demo',
  /* DELETE */
  title: '圆角',
  titleEnUS: 'Round',
  background: '#fff',
  /* DELETE */
  components: {
    'md-notice-bar': NoticeBar,
  },
}
</script>
