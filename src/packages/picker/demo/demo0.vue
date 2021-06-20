<script lang="ts">
export default {
  name: 'PickerDemo',
  title: '基本',
}
</script>
<script setup lang="ts">
import { ref } from 'vue'
import MdPicker from 'mand-mobile/picker'
import yearData from './data/simple'

const pickerData = ref(yearData)
const pickerValue = ref<Array<string | number>>([1, 2])
const pickerInvalidValue = ref([[2, 3, 4]])
</script>

<template>
  <div
    class="
      md-example-child
      md-example-child-picker
      md-example-child-picker-0
    "
  >
    <md-picker
      v-model="pickerValue"
      :data="pickerData"
      :invalid-value="pickerInvalidValue"
      :cols="2"
      is-view
    />
  </div>
</template>
