<script lang="ts">
export default {
  name: 'ActionBarDemo',
  title: '按钮禁用',
}
</script>
<script setup lang="ts">
import { reactive } from 'vue'
import MdActionBar from 'mand-mobile-next/action-bar'

const data = reactive([
  {
    text: '次要按钮',
    disabled: true,
    onClick: (ev: Event, action: any) => {
      console.log('action', ev, action)
    },
  },
  {
    text: '主要按钮',
    disabled: true,
    onClick: (ev: Event, action: any) => {
      console.log('action', ev, action)
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
