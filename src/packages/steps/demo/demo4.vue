<script lang="ts">
export default {
  name: 'StepsDemo',
  title: '进度变化动效',
}
</script>
<script setup lang="ts">
import MdSteps from 'mand-mobile-next/steps'
import { ref } from 'vue'
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

let currentStep = ref(0)

setTimeout(() => {
  currentStep.value = 2
}, 5000)
</script>

<template>
  <md-steps
    :steps="steps"
    :current="currentStep"
    transition
  >
  </md-steps>
</template>
