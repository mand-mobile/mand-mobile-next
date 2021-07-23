<script lang="ts">
export default {
  name: 'ActionBarDemo',
  title: '基本',
}
</script>
<script setup lang="ts">
import { reactive } from 'vue'
import MdActionBar from 'mand-mobile-next/action-bar'
import Toast from 'mand-mobile-next/toast'

const data = reactive([
  {
    text: '主要按钮',
    onClick: (ev: Event, action: any) => {
      Toast.info('点击主要按钮')
    },
  },
])
</script>

<template>
  <div
    class="
      md-example-child
      md-example-child-action-bar
      md-example-child-0
    "
  >
    <md-action-bar :actions="data"></md-action-bar>
  </div>
</template>
