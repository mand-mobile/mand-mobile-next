<script lang="ts">
export default {
  name: 'StepsDemo',
  title: '自定义内容',
}
</script>
<script setup lang="ts">
import MdSteps from 'mand-mobile-next/steps'
import MdIcon from 'mand-mobile-next/icon'
// import MdAmount from 'mand-mobile-next/amount'
const steps0 = [
  {
    name: '还款申请已提交',
    amount: '600.5',
    text: '银行处理中，预计<span>30分钟</span>内到账，请留意短信信息。如有疑问，请联系客服。',
  },
  {
    name: '还款成功',
  },
]
const steps1 = [
  {
    name: '还款申请已提交',
  },
  {
    name: '还款成功',
    amount: '600.5',
  },
]
</script>

<template>
  <!-- eslint-disable vue/no-v-html -->
  <div
    class="
      md-example-child
      md-example-child-steps
      md-example-child-steps-8
    "
  >
    <md-steps
      direction="vertical"
      :steps="steps0"
      :current="0.5"
    >
      <template #reached>
        <md-icon name="checked"></md-icon>
      </template>
      <template #content="{ index, step }">
        <div class="custom-content">
          <template v-if="index === 0">
            <p class="name active" v-text="step.name"></p>
            <p class="amount">{{ step.amount }} 元</p>
            <p class="desc" v-html="step.text"></p>
          </template>
          <template v-else>
            <p class="name" v-text="step.name"></p>
          </template>
        </div>
      </template>
    </md-steps>
    <md-steps
      direction="vertical"
      :steps="steps1"
      :current="1"
    >
      <template #current>
        <md-icon name="checked"></md-icon>
      </template>
      <template #content="{ index, step }">
        <div class="custom-content">
          <template v-if="index === 1">
            <p class="name active" v-text="step.name"></p>
            <p class="amount">{{ step.amount }}元</p>
          </template>
          <template v-else>
            <p class="name" v-text="step.name"></p>
          </template>
        </div>
      </template>
    </md-steps>
  </div>
</template>
<style lang="stylus">
.md-example-child-steps-8
  .custom-content
    .name
      font-size 28px
      color #858B9C
      &.active
        font-size 40px
        color #111A34
    .amount
      margin-top 20px
      color #111A34
      .md-amount
        margin-right 5px
        font-size 80px
    .desc
      line-height 40px !important
      span
        color #FF8325
.md-example-child-steps-8 .md-steps.md-steps-vertical
  height 480px
</style>
