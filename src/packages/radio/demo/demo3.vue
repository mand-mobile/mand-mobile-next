<script lang="ts">
export default {
  name: 'RadioDemo',
  title: '列表模式',
}
</script>
<script setup lang="ts">
import { reactive, ref } from 'vue'
import { RadioList as MdRadioList } from 'mand-mobile-next/radio'
import MdField from 'mand-mobile-next/field'

const myBank = ref('')
const banks = reactive([
  {
    value: '0',
    text: '交通银行(尾号3089)',
    brief: '选项摘要描述',
  },
  {
    value: '1',
    text: '招商银行(尾号2342)',
    brief: '选项摘要描述',
  },
  {
    value: '2',
    text: '建设银行(尾号4321)',
    brief: '选项摘要描述',
    disabled: true,
  },
])

const myReason = ref('')
const reasons = reactive([
  {
    value: '0',
    text: '我有其他保险',
  },
  {
    value: '1',
    text: '每单都扣，我担心扣太多',
  },
  {
    value: '2',
    text: '我身体好，不需要重疾险',
  },
  {
    value: '3',
    text: '接单少，加入这个没什么用',
  },
  {
    value: '4',
    text: '我不了解这是什么计划',
  },
])
</script>

<template>
  <div
    class="
      md-example-child
      md-example-child-radio
      md-example-child-radio-2
    "
  >
    {{ myBank }}
    <md-field title="简单选择列表" class="radio-field">
      <md-radio-list
        v-model="myBank"
        :options="banks"
        icon-size="lg"
      />
    </md-field>
    {{ myReason }}
    <md-field title="输入项" class="radio-field">
      <md-radio-list
        v-model="myReason"
        :options="reasons"
        icon="right"
        icon-inverse=""
        icon-disabled=""
        icon-position="right"
        has-input
        input-label="其他"
        input-placeholder="请输入原因"
      />
    </md-field>
  </div>
</template>

<style lang="stylus">
.radio-field
  margin-bottom 40px
</style>
