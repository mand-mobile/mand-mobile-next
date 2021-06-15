<script lang="ts">
export default {
  name: 'StepsDemo',
  title: '纵向展示',
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
  <div
    class="
      md-example-child
      md-example-child-steps
      md-example-child-steps-7
    "
  >
    <md-steps
      direction="vertical"
      :steps="steps"
      :current="1"
      vertical-adaptive
    ></md-steps>
  </div>
</template>

<style lang="stylus">
.md-example-child-steps-7 .md-steps
  height 420px
</style>
