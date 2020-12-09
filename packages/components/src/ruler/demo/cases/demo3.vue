<template>
  <div class="md-example-child md-example-child-single-component">
    <p>当前值：{{ value }}</p>
    <div class="container">
      <md-ruler
        v-model="value"
        :scope="scope"
        :step="100"
        :unit="10"
        :step-text-render="stepTextRender"
      ></md-ruler>
    </div>
  </div>
</template>

<script>
import Ruler from 'mand-mobile/lib/ruler'

export default {
  components: {
    'md-ruler': Ruler,
  },
  data() {
    return {
      value: 1300,
      scope: [1000, 2000],
    }
  },
  methods: {
    stepTextRender(step) {
      return step + 'cm'
    },
  },
}
// #region ignore
export const metaInfo = {
  'zh-CN': {
    title: '自定义step展示文案',
    describe: '请在移动设备中扫码预览',
  },
  'en-US': {
    title: 'Customize step text',
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
