<script lang="ts">
export default {
  name: 'DatePickerDemo',
  title: '自定义日期时间选择',
}
</script>
<script setup lang="ts">
import { ref, watch } from 'vue'
import MdDatePicker from 'mand-mobile-next/date-picker'

const minDate = new Date('2021/1/1 12:00:00')
const maxDate = new Date('2030/9/9 09:00:00')
const selectedDateTime = ref([18, 10, 2021])
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
      is-view
      :custom-types="customTypes"
      :text-render="textRender"
      :unit-text="['日', '月', '年']"
      :keep-index="true"
      today-text="今日"
      :min-date="minDate"
      :max-date="maxDate"
    ></md-date-picker>
  </div>
</template>
