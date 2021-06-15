<script lang="ts">
export default {
  name: 'StepsDemo',
  title: '完成全部步骤',
}
</script>
<script setup lang="ts">
import MdSteps from 'mand-mobile/steps'
const steps = [
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
]
</script>

<template>
  <md-steps :steps="steps" :current="4"></md-steps>
</template>
