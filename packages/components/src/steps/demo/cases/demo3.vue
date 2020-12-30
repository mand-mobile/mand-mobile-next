<template>
  <div class="md-example-child md-example-child-steps md-example-child-steps-3">
    <p class="title">自动文本位置交错</p>
    <md-steps :steps="steps0" :current="2" dislocation></md-steps>
    <p class="title">自定义节点配置</p>
    <md-steps :steps="steps1" :current="0.7">
      <template #reached={}>
        <div class="step-icon reached"></div>
      </template>
      <template #unreached={}>
        <div class="step-icon"></div>
      </template>
    </md-steps>
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
      steps0: [
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
      steps1: [
        {
          name: '起息日期',
          text: '2020/10/10',
          flex: 3,
          alignItems: 'flex-end',
          textPosition: 'top',
          textAlign: 'left',
          iconSize: 1,
          barSize: 20,
          barText: '已存入42天',
          barColor: 'rgba(66, 128, 235, .4)',
        },
        {
          name: '到期日期',
          text: '2020/12/10',
          textPosition: 'top',
          alignItems: 'flex-end',
          textAlign: 'right',
          iconSize: 1,
          barSize: 20,
        },
        {
          name: '随时支取',
          text: '到期',
          textPosition: 'top',
          textAlign: 'right',
          iconSize: 1,
          barSize: 20,
        },
      ],
    }
  },
}
// #region ignore
export const metaInfo = {
  'zh-CN': {
    title: '步骤个性化配置',
  },
  'en-US': {
    title: 'Step personalized configuration',
  },
}
// #endregion ignore

</script>

<style scoped>
.md-example-child-steps-3 {
  padding: 0 30px;
}
.md-example-child-steps-3 .title {
  margin-bottom: 20px;
  color: #999;
}
.step-icon {
  display: flex;
  width: 2px;
  height: 65px;
  background: #e2e4ea;
}
.step-icon.reached {
  background: #2f86f6;
}
</style>