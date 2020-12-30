<template>
  <div class="md-example-child md-example-child-steps md-example-child-steps-7">
    <md-steps
      direction="vertical"
      :steps="steps"
      :current="1.5"
      adaptive
    >
      <template #reached={}>
        <div class="step-icon reached"></div>
      </template>
      <template #current={}>
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
      steps: [
        {
          name: '步骤一',
          text: '这是步骤一的描述',
        },
        {
          name: '步骤二',
          text: '这是步骤二的描述',
        },
        {
          name: '步骤三',
          text: '这是步骤三的描述',
        },
      ],
    }
  },
}
// #region ignore
export const metaInfo = {
  'zh-CN': {
    title: '纵向展示',
  },
  'en-US': {
    title: 'Vertical display',
  },
}
// #endregion ignore

</script>

<style scoped>
.md-example-child-steps-7 {
  height: 450px;
  padding: 40px;
  border-radius: 8px;
  background: #FFF;
}
.step-icon {
  width: 32px;
  height: 32px;
  border: solid 6px #e2e4ea;
  border-radius: 50%;
  box-sizing: border-box;
}
.step-icon.reached {
  border-color: #2f86f6;
}
</style>
