<script lang="ts">
export default {
  name: 'DatePickerDemo',
  title: '自定义日期时间选择',
}
</script>
<script setup lang="ts">
import { ref, watch } from 'vue'
import MdDatePicker from 'mand-mobile/date-picker'

const minDate = new Date('2013/9/9 12:00:00')
const maxDate = new Date('2022/9/9 09:00:00')
const selectedDateTime = ref(new Date())
const customTypes = ['dd', 'MM', 'yyyy']
const MONTH_MAP = [
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'May',
  'Jun',
  'Jul',
  'Aug',
  'Sept',
  'Oct',
  'Nov',
  'Dec',
]

const textRender = (
  typeFormat: string,
  columnValue: number
) => {
  if (typeFormat === 'MM') {
    return MONTH_MAP[columnValue - 1]
  }
  return
}

watch(selectedDateTime, (val) => {
  console.log(val)
})
</script>

<template>
  <div
    class="
      md-example-child
      md-example-child-date-picker
      md-example-child-date-picker-3
    "
  >
    <md-date-picker
      v-model="selectedDateTime"
      type="custom"
      :custom-types="customTypes"
      :text-render="textRender"
      :unit-text="['日', '月', '年']"
      today-text="今日"
      :min-date="minDate"
      :max-date="maxDate"
    ></md-date-picker>
  </div>
</template>
