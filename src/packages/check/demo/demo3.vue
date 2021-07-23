<script lang="ts">
export default {
  name: 'CheckDemo',
  title: '复选列表',
}
</script>
<script setup lang="ts">
import { ref } from 'vue'
import { CheckList as MdCheckList } from 'mand-mobile-next/check'
import MdField from 'mand-mobile-next/field'

const fruits = ref([
  { value: 'watermelon', label: '西瓜' },
  { value: 'apple', label: '苹果' },
  { value: 'banana', label: '香蕉' },
  { value: 'orange', label: '橙子' },
  { value: 'tomato', label: '西红柿', disabled: true },
])
const favorites = ref(['apple'])
</script>

<template>
  <md-field title="复选列表">
    <md-check-list
      v-model="favorites"
      icon="right"
      icon-inverse=""
      :options="fruits"
    />
  </md-field>
</template>
