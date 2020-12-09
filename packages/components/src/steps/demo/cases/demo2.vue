<template>
  <div class="md-example-child md-example-child-steps md-example-child-steps-2">
    <md-steps :steps="steps" :current="2">
      <template v-slot:icon>
        <span>99</span>
      </template>
    </md-steps>
  </div>
</template>

<script>
import Steps from 'mand-mobile/lib/steps'
import Icon from 'mand-mobile/lib/icon'

export default {
  components: {
    'md-steps': Steps,
    'md-icon': Icon,
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
    title: '自定义步骤图标',
  },
  'en-US': {
    title: 'Custom step icon',
  },
}
// #endregion ignore

</script>
