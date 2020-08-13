<template>
  <div class="md-example-child md-example-child-toast">
    <md-button @click="showSucceedToast">失败</md-button>
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
    showSucceedToast() {
      Toast.failed('操作失败')
    },
  },
}

</script>