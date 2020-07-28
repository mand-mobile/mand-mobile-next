<template>
  <div class="md-example-child md-example-child-toast">
    <md-button @click="showSucceedToast">失败</md-button>
  </div>
</template>

<script>import Button from '../../../button'
import Toast from '../../../toast'

export default {
  name: 'toast-demo',
  components: {
    'md-button': Button,
  },
  methods: {
    showSucceedToast() {
      Toast.failed('操作失败')
    },
  },
}
</script>