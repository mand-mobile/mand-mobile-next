<template>
  <div
    class="
      md-example-child
      md-example-child-notice-bar
      md-example-child-notice-bar-7
    "
  >
    <md-notice-bar>
      <template #left>
        <md-icon
          class="
            md-notice-demo-icon md-notice-demo-icon-left
          "
          name="security"
        ></md-icon>
      </template>

      为了确保您的资金安全，请设置支付密码
    </md-notice-bar>
  </div>
</template>

<script lang="ts">
import { NoticeBar } from 'mand-mobile-next/notice-bar'
import { Icon } from 'mand-mobile-next/icon'

export default {
  name: 'NoticeBarDemo',
  /* DELETE */
  title: '使用插槽自定义',
  titleEnUS: 'Customize',
  background: '#fff',
  /* DELETE */
  components: {
    MdNoticeBar: NoticeBar,
    MdIcon: Icon,
  },
}
</script>
