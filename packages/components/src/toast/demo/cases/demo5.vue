<template>
  <div class="md-example-child md-example-child-toast">
    <md-button @click="showToast">长文字</md-button>
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
    showToast() {
      Toast.succeed('所有文案部分字数最多展示15个字')
    },
  },
}

</script>