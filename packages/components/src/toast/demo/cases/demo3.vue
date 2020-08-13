<template>
  <div class="md-example-child md-example-child-toast">
    <md-button @click="showLoadingToast">载入</md-button>
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
    showLoadingToast() {
      Toast.loading('加载中...')
      setTimeout(() => {
        Toast.hide()
      }, 3000)
    },
  },
}

</script>