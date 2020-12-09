
<template>
  <div class="md-example-child md-example-child-toast md-example-child-toast-7">
    <md-toast ref="toast">
      <md-activity-indicator
        :size="20"
        :text-size="16"
        color="yellow"
        text-color="white"
      >loading...</md-activity-indicator>
    </md-toast>
    <md-button inline size="small" @click="showTextToast">定制内容</md-button>
  </div>
</template>

<script>
import Button from 'mand-mobile/lib/button'
import Toast from 'mand-mobile/lib/toast'
import ActivityIndicator from 'mand-mobile/lib/activity-indicator'

export default {
  name: 'toast-demo',
  components: {
    'md-toast': Toast,
    'md-button': Button,
    'md-activity-indicator': ActivityIndicator,
  },
  data() {
    return {
      isShow: false,
    }
  },
  methods: {
    showTextToast() {
      if (this.isShow) {
        this.$refs.toast.hide()
        this.isShow = false
      } else {
        this.$refs.toast.show()
        this.isShow = true
      }
    },
  },
}
// #region ignore
export const metaInfo = {
  platform: 'web',
  'zh-CN': {
    title: '定制Toast',
  },
  'en-US': {
    title: 'Customized toast cotent',
  },
}
// #endregion ignore

</script>
