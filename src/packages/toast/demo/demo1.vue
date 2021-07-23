<script lang="ts">
export default {
  name: 'ToastDemo',
  title: '成功',
  titleEnUS: 'Success',
}
</script>
<script setup lang="ts">
import Toast from 'mand-mobile-next/toast'
import MdButton from 'mand-mobile-next/button'

const showSucceedToast = () => {
  Toast.succeed('操作成功')
}
</script>
<template>
  <div
    class="
      md-example-child
      md-example-child-toast
      md-example-child-toast-1
    "
  >
    <md-button @click="showSucceedToast">成功</md-button>
  </div>
</template>
