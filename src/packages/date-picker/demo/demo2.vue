<script lang="ts">
export default {
  name: 'DatePickerDemo',
  title: '日期时间选择',
}
</script>
<script setup lang="ts">
import { ref, watch } from 'vue'
import MdDatePicker from 'mand-mobile-next/date-picker'

const minDate = new Date('2013/9/9 12:00:00')
const maxDate = new Date('2022/9/9 23:00:00')
const selectedDateTime = ref(new Date())
</script>

<template>
  <div
    class="
      md-example-child
      md-example-child-date-picker
      md-example-child-date-picker-2
    "
  >
    <md-date-picker
      v-model="selectedDateTime"
      type="datetime"
      is-view
      :min-date="minDate"
      :max-date="maxDate"
    ></md-date-picker>
  </div>
</template>
