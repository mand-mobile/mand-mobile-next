<script lang="ts">
export default {
  name: 'ToastDemo',
  title: '长文字',
  titleEnUS: 'Long text',
}
</script>
<script setup lang="ts">
import Toast from 'mand-mobile/toast'
import MdButton from 'mand-mobile/button'

const showToast = () => {
  Toast.succeed('所有文案部分字数最多展示15个字')
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
    <md-button @click="showToast">长文字</md-button>
  </div>
</template>
