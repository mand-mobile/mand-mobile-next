<template>
  <div class="md-example-child md-example-child-steps md-example-child-steps-4">
    <md-steps
      :steps="steps"
      :current="currentStep"
      transition
    ></md-steps>
    <md-button size="small" inline @click="next">下一步</md-button>
  </div>
</template>

<script>
import Steps from 'mand-mobile/lib/steps'
import Button from 'mand-mobile/lib/button'

export default {
  components: {
    'md-steps': Steps,
    'md-button': Button,
  },
  data() {
    return {
      steps: [
        {
          name: '登录',
        },
        {
          name: '开通',
        },
        {
          name: '验证',
        },
        {
          name: '成功',
        },
      ],
      currentStep: 0,
    }
  },
  methods: {
    next() {
      const {currentStep, steps} = this
      this.currentStep = currentStep < steps.length - 1 ? currentStep + 1 : 0
    },
  },
}
// #region ignore
export const metaInfo = {
  'zh-CN': {
    title: '进度变化动效',
  },
  'en-US': {
    title: 'Transition of progress',
  },
}
// #endregion ignore

</script>

<style scoped>
.md-example-child-steps-4 {
  padding: 0 30px;
}
</style>

