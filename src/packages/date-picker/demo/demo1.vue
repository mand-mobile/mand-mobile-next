<script lang="ts">
export default {
  name: 'DatePickerDemo',
  title: '时间选择',
}
</script>
<script setup lang="ts">
import { ref, watch } from 'vue'
import MdDatePicker from 'mand-mobile/date-picker'

const selectedTime = ref([23, 0, 0])
const unit = ['小时', '分', '秒']
</script>

<template>
  <md-date-picker
    v-model="selectedTime"
    type="time"
    is-view
    :unit-text="unit"
  ></md-date-picker>
</template>
