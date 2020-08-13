<template>
  <div class="md-example-child md-example-child-toast">
    <md-button @click="showTextToast">自定义位置</md-button>
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
      Toast.create({
        content: '自定义位置',
        position: 'bottom',
      })
    },
  },
}

</script>