<script lang="ts">
export default {
  name: 'ToastDemo',
  title: '载入',
  titleEnUS: 'Loading',
}
</script>
<script setup lang="ts">
import Toast from 'mand-mobile/toast'
import MdButton from 'mand-mobile/button'

const showLoadingToast = () => {
  Toast.loading('加载中...')
  setTimeout(() => {
    Toast.hide()
  }, 3000)
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
    <md-button @click="showLoadingToast">载入</md-button>
  </div>
</template>
