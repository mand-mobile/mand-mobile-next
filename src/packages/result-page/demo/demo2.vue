<script lang="ts">
export default {
  name: 'ResultPageDemo',
  title: '带按钮',
}
</script>
<script setup lang="ts">
import { ref } from 'vue'
import MdResultPage from 'mand-mobile-next/result-page'
import Toast from 'mand-mobile-next/toast'

const buttons = ref([
  {
    text: '普通按钮',
    handler() {
      Toast.succeed('普通操作')
    },
  },
  {
    text: '高亮按钮',
    type: 'primary',
    handler() {
      Toast.succeed('不普通操作')
    },
  },
])
</script>

<template>
  <div
    class="
      md-example-child
      md-example-child-result-page
      md-example-child-result-page-2
    "
  >
    <md-result-page :buttons="buttons"></md-result-page>
  </div>
</template>
