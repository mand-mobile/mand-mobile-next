<script lang="ts">
export default {
  name: 'StepsDemo',
  title: '自定义步骤图标',
}
</script>
<script setup lang="ts">
import MdSteps from 'mand-mobile/steps'
import MdIcon from 'mand-mobile/icon'
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
  <md-steps :steps="steps" :current="2">
    <template #icon="props">
      <b v-if="props.index === props.currentIndex">{{
        props.index
      }}</b>
      <span v-else>{{ props.index }}</span>
    </template>
  </md-steps>
  <md-steps :steps="steps" :current="2">
    <template #reached="props">
      <!-- props.index -->
      <md-icon
        v-if="props.index === 1"
        name="checked"
      ></md-icon>
      <div v-else class="step-node-default">
        <div
          class="step-node-default-icon"
          style="
            width: 6px;
            height: 6px;
            border-radius: 50%;
          "
        ></div>
      </div>
    </template>
    <template #current>
      <md-icon name="location"></md-icon>
    </template>
    <template #unreached>
      <md-icon name="time"></md-icon>
    </template>
  </md-steps>
</template>
