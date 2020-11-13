<template>
  <div class="md-example-child md-example-child-steps md-example-child-steps-4">
    <md-steps
      :steps="steps"
      :current="currentStep"
      transition
    ></md-steps>
  </div>
</template>

<script>
import Steps from 'mand-mobile/lib/steps'

export default {
  components: {
    'md-steps': Steps,
  },
  mounted() {
    setTimeout(() => {
      this.currentStep = 3
    }, 2000)
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

