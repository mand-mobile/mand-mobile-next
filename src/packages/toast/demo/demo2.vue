<script lang="ts">
export default {
  name: 'ToastDemo',
  title: '失败',
  titleEnUS: 'Failure',
}
</script>
<script setup lang="ts">
import Toast from 'mand-mobile-next/toast'
import MdButton from 'mand-mobile-next/button'

const showSucceedToast = () => {
  Toast.failed('操作失败')
}
</script>
<template>
  <div
    class="
      md-example-child
      md-example-child-toast
      md-example-child-toast-2
    "
  >
    <md-button @click="showSucceedToast">失败</md-button>
  </div>
</template>
