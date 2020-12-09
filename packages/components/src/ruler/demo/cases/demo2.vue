<template>
  <div class="md-example-child md-example-child-single-component">
    <p>当前值：{{ value }}</p>
    <div class="container">
      <md-ruler
        :scope="scope"
        :step="100"
        :unit="10"
        :max="2000"
        :min="1000"
        v-model="value"
      ></md-ruler>
    </div>
    <md-button size="small" inline @click="value = 1500">设置1500</md-button>
  </div>
</template>

<script>
import Button from 'mand-mobile/lib/button'
import Ruler from 'mand-mobile/lib/ruler'

export default {
  components: {
    'md-button': Button,
    'md-ruler': Ruler,
  },
  data() {
    return {
      value: 1300,
      scope: [1000, 2000],
    }
  },
}
// #region ignore
export const metaInfo = {
  'zh-CN': {
    title: '触发',
    describe: '请在移动设备中扫码预览',
  },
  'en-US': {
    title: 'trigger',
    describe: 'Please scan QR code and preview on mobile device',
  },
}
// #endregion ignore

</script>

<style scoped>
.md-example-child-single-component .container {
  width: 640px;
  margin: 0 auto;
}
</style>
