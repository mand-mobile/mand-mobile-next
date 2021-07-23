<script lang="ts">
export default {
  name: 'ToastDemo',
  title: '连续调用',
  titleEnUS: 'Continuous call',
}
</script>
<script setup lang="ts">
import Toast from 'mand-mobile-next/toast'
import MdButton from 'mand-mobile-next/button'

const start = () => {
  Toast.loading('载入中')
  setTimeout(() => {
    Toast.failed('载入失败')
  }, 500)
}
</script>
<template>
  <div
    class="
      md-example-child
      md-example-child-toast
      md-example-child-toast-3
    "
  >
    <md-button @click="start">连续调用</md-button>
  </div>
</template>
