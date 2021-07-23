<script lang="ts">
export default {
  name: 'PickerDemo',
  title: '联动数据',
}
</script>
<script setup lang="ts">
import { ref } from 'vue'
import MdButton from 'mand-mobile-next/button'
import MdPicker from 'mand-mobile-next/picker'
import areaData from './data/area'
import districtData from './data/district'

const pickerData = ref(areaData)
const pickerValue = ref<Array<string | number>>([
  '220000',
  '220400',
])
const pickerInvalidValue = ref([['120000']])
const cols = ref(3)

const onChangeData = () => {
  pickerData.value = districtData
  cols.value = 4
}
</script>

<template>
  <div
    class="
      md-example-child
      md-example-child-picker
      md-example-child-picker-1
    "
  >
    <md-picker
      v-model="pickerValue"
      :data="pickerData"
      :is-cascade="true"
      :cols="cols"
      :invalid-value="pickerInvalidValue"
      is-view
    />
    <md-button
      type="primary"
      size="small"
      inline
      @click="onChangeData"
      >切换数据</md-button
    >
  </div>
</template>
