<script lang="ts">
export default {
  name: 'DatePickerDemo',
  title: '基本',
}
</script>
<script setup lang="ts">
import { ref, watch } from 'vue'
import MdDatePicker from 'mand-mobile/date-picker'

const minDate = new Date('2013/9/9')
const maxDate = new Date('2022/9/9')
const selectedDate = ref(new Date())

watch(selectedDate, (val) => {
  console.log(val)
})
</script>

<template>
  <div
    class="
      md-example-child
      md-example-child-date-picker
      md-example-child-date-picker-0
    "
  >
    <md-date-picker
      v-model="selectedDate"
      :min-date="minDate"
      :max-date="maxDate"
    ></md-date-picker>
  </div>
</template>
