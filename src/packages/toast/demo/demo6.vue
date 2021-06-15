<script lang="ts">
export default {
  name: 'ToastDemo',
  title: '自定义位置',
  titleEnUS: 'Customize location',
}
</script>
<script setup lang="ts">
import Toast from 'mand-mobile/toast'
import MdButton from 'mand-mobile/button'

const showTextToast = () => {
  Toast.create({
    content: '自定义位置',
    position: 'bottom',
  })
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
    <md-button @click="showTextToast">自定义位置</md-button>
  </div>
</template>
