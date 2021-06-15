<script lang="ts">
export default {
  name: 'DialogDemo',
  title: '单例模式',
}
</script>
<script setup lang="ts">
import Dialog from 'mand-mobile/dialog'
import MdButton from 'mand-mobile/button'
import { ref } from 'vue'
import Toast from 'mand-mobile/toast'

const show = ref(false)
const onBasicCancel = () => {
  Toast.info('你点击了取消')
}
const onBasicConfirm = () => {
  Toast.succeed('你点击了确认')
}

const confirmHandler = () => {
  Dialog.confirm({
    title: '确认',
    content: '请确认是否进行操作',
    confirmText: '确定',
    onConfirm: () =>
      console.log('[Dialog.confirm] confirm clicked'),
  })
}

const alertHandler = () => {
  Dialog.alert({
    title: '警告',
    content: '您正在进行非法操作',
    cancelText: '取消',
    confirmText: '确定',
    transition: 'md-fade',
    onConfirm: () =>
      console.log('[Dialog.alert] confirm clicked'),
  })
}

const succeedHandler = () => {
  Dialog.succeed({
    title: '成功',
    content: '恭喜您成功完成操作',
    confirmText: '确定',
    onConfirm: () =>
      console.log('[Dialog.succeed] confirm clicked'),
  })
}

const failedHandler = () => {
  Dialog.failed({
    title: '失败',
    content: '操作失败，请稍后重试',
    confirmText: '确定',
    onConfirm: () =>
      console.log('[Dialog.failed] confirm clicked'),
  })
}
</script>

<template>
  <div
    class="
      md-example-child
      md-example-child-dialog
      md-example-child-dialog-0
    "
  >
    <md-button @click="alertHandler">警告弹窗</md-button>
    <md-button @click="confirmHandler">确认弹窗</md-button>
    <md-button @click="succeedHandler">成功弹窗</md-button>
    <md-button @click="failedHandler">失败弹窗</md-button>
  </div>
</template>

<style lang="stylus">
.md-example-child-dialog-0
  .md-button
    margin-bottom 16px
.dialog-banner
  img
    display block
    width 100%
</style>
