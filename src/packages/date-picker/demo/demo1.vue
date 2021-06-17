<script lang="ts">
export default {
  name: 'DatePickerDemo',
  title: '时间选择',
}
</script>
<script setup lang="ts">
import { ref, watch } from 'vue'
import MdDatePicker from 'mand-mobile/date-picker'

const minDate = new Date('2013/9/9')
const maxDate = new Date('2022/9/9')
const selectedTime = ref(new Date())
const unit = ['时', '分', '秒']

watch(selectedTime, (val) => {
  console.log(val)
})
</script>

<template>
  <div
    class="
      md-example-child
      md-example-child-date-picker
      md-example-child-date-picker-1
    "
  >
    <md-date-picker
      v-model="selectedTime"
      type="time"
      :unit-text="unit"
    ></md-date-picker>
  </div>
</template>
