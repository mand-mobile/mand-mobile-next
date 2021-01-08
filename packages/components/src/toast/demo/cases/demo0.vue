<template>
  <div class="md-example-child md-example-child-toast">
    <md-button class="button" inline small @click="showTextToast">纯文字</md-button>
    <md-button class="button" inline small @click="showSucceedToast">成功</md-button>
    <md-button class="button" inline small @click="showFailedToast">失败</md-button>
    <md-button class="button" inline small @click="showLoadingToast">载入</md-button>
    <md-button class="button" inline small @click="showMultiToast">连续调用</md-button>
    <md-button class="button" inline small @click="showLoginTextToast">长文字</md-button>
  </div>
</template>

<script>
import Button from 'mand-mobile/lib/button'
import Toast from 'mand-mobile/lib/toast'

export default {
  name: 'toast-demo',
  components: {
    'md-button': Button,
  },
  methods: {
    showTextToast() {
      Toast.info('一段文字')
    },
    showSucceedToast() {
      Toast.succeed('操作成功')
    },
    showFailedToast() {
      Toast.failed('操作失败')
    },
    showLoadingToast() {
      Toast.loading('加载中...')
      setTimeout(() => {
        Toast.hide()
      }, 3000)
    },
    showMultiToast() {
      Toast.loading('载入中')
      setTimeout(() => {
        Toast.hide()
        setTimeout(() => {
          Toast.failed('载入失败')
        }, 10)
      }, 500)
    },
    showLoginTextToast() {
      Toast.succeed('所有文案部分字数最多展示15个字')
    },
  },
}

</script>

<style scoped>
.button {
  margin: 10px;
}
</style>
