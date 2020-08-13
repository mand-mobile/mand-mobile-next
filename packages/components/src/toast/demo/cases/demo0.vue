<template>
  <div class="md-example-child md-example-child-toast">
    <md-button @click="showTextToast">纯文字</md-button>
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
  },
}

</script>
