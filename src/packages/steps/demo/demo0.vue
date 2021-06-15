<script lang="ts">
export default {
  name: 'StepsDemo',
  title: '基本',
}
</script>
<script setup lang="ts">
import MdSteps from 'mand-mobile/steps'
const steps = [
  {
    name: '登录/注册',
  },
  {
    name: '申请征信报告',
  },
  {
    name: '提取征信报告',
  },
]
</script>

<template>
  <md-steps :steps="steps"></md-steps>
</template>
