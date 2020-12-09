<template>
  <div class="md-example-child md-example-child-steps md-example-child-steps-6">
    <md-steps :steps="steps" :current="currentStep"></md-steps>
  </div>
</template>

<script>
import Steps from 'mand-mobile/lib/steps'

export default {
  components: {
    'md-steps': Steps,
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
      currentStep: 4,
    }
  },
}
// #region ignore
export const metaInfo = {
  'zh-CN': {
    title: '完成全部步骤',
  },
  'en-US': {
    title: 'Complete all steps',
  },
}
// #endregion ignore

</script>
