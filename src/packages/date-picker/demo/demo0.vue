<script lang="ts">
export default {
  name: 'DatePickerDemo',
  title: '基本',
}
</script>
<script setup lang="ts">
import { ref, watch } from 'vue'
import MdDatePicker from 'mand-mobile-next/date-picker'

const minDate = new Date('2013/9/9')
const maxDate = new Date('2022/9/9')
const selectedDate = ref(new Date())
</script>

<template>
  <md-date-picker
    v-model="selectedDate"
    is-view
    :min-date="minDate"
    :max-date="maxDate"
  ></md-date-picker>
</template>
