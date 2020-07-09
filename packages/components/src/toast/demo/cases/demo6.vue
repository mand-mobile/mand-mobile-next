<template>
  <div class="md-example-child md-example-child-toast md-example-child-toast-0">
    <md-button @click="showTextToast">自定义位置</md-button>
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
    showTextToast() {
      Toast({
        content: '自定义位置',
        position: 'bottom',
      })
    },
  },
}
</script>