<script lang="ts">
export default {
  name: 'StepsDemo',
  title: '指定当前步骤',
}
</script>
<script setup lang="ts">
import MdSteps from 'mand-mobile-next/steps'
import MdIcon from 'mand-mobile-next/icon'
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
  <md-steps :steps="steps" :current="2"> </md-steps>
</template>
