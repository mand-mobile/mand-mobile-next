<script lang="ts">
export default {
  name: 'ToastDemo',
  title: '基本',
}
</script>
<script setup lang="ts">
import Toast from 'mand-mobile/toast'
import MdButton from 'mand-mobile/button'

const showTextToast = () => {
  Toast.info('一段文字')
  setTimeout(() => {
    Toast.hide()
  }, 1500)
}
</script>

<template>
  <div
    class="
      md-example-child
      md-example-child-toast
      md-example-child-toast-0
    "
  >
    <md-button @click="showTextToast">纯文字</md-button>
  </div>
</template>
