<template>
  <div class="md-example-child md-example-child-toast md-example-child-toast-1">
    <md-button @click="showSucceedToast">成功</md-button>
  </div>
</template>

<script>
import Button from '../../../button'
import Toast from '../../../toast'

export default {
  name: 'toast-demo',
  components: {
    'md-button': Button,
  },
  methods: {
    showSucceedToast() {
      Toast.succeed('操作成功')
    },
  },
}
</script>