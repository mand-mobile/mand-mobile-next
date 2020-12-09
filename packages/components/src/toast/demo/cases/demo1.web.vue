<template>
  <div class="md-example-child md-example-child-toast">
    <md-button inline size="small" @click="showTextToast">底部展示</md-button>
  </div>
</template>

<script>
import Button from 'mand-mobile/lib/button'
import Toast from 'mand-mobile/lib/toast'

export default {
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
// #region ignore
export const metaInfo = {
  platform: 'web',
  'zh-CN': {
    title: '自定义位置',
  },
  'en-US': {
    title: 'Customized position',
  },
}
// #endregion ignore

</script>