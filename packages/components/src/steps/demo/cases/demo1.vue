<template>
  <div class="md-example-child md-example-child-steps md-example-child-steps-1">
    <md-steps :steps="steps" :current="1.2"></md-steps>
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
    }
  },
}
// #region ignore
export const metaInfo = {
  'zh-CN': {
    title: '进度非整数',
  },
  'en-US': {
    title: 'Non-integer progress',
  },
}
// #endregion ignore

</script>