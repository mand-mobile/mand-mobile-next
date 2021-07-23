<template>
  <div
    class="
      md-example-child
      md-example-child-notice-bar
      md-example-child-notice-bar-7
    "
  >
    <md-notice-bar scrollable>
      <template #left>
        <md-icon
          class="
            md-notice-demo-icon md-notice-demo-icon-left
          "
          name="security"
        ></md-icon>
      </template>

      {{ content }}
    </md-notice-bar>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from 'vue'
import { NoticeBar } from 'mand-mobile-next/notice-bar'
import { Icon } from 'mand-mobile-next/icon'

export default defineComponent({
  name: 'NoticeBarDemo',
  /* DELETE */
  title: '动态插槽内容',
  titleEnUS: 'Dynamic slot content',
  background: '#fff',
  /* DELETE */
  components: {
    MdNoticeBar: NoticeBar,
    [Icon.name]: Icon,
  },
  setup() {
    const content = ref(
      '为了确保您的资金安全，请设置支付密码'
    )
    onMounted(() => {
      setTimeout(() => {
        content.value =
          '为了确保您的资金安全，请设置支付密码;为了确保您的资金安全，请设置支付密码'
      }, 2000)

      setTimeout(() => {
        content.value =
          '为了确保您的资金安全，请设置支付密码'
      }, 8000)
    })
    return {
      content,
    }
  },
})
</script>
