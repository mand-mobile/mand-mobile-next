<script lang="ts">
export default {
  name: 'PickerDemo',
  title: '基本',
}
</script>
<script setup lang="ts">
import { ref } from 'vue'
import MdPicker from 'mand-mobile-next/picker'
import yearData from './data/simple'

const pickerData = ref(yearData)
const pickerValue = ref<Array<string | number>>([1, 2])
const pickerInvalidValue = ref([[2, 3, 4]])
</script>

<template>
  <md-picker
    v-model="pickerValue"
    :data="pickerData"
    :invalid-value="pickerInvalidValue"
    :cols="2"
    is-view
  />
</template>
