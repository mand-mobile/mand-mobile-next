<script lang="ts">
export default {
  name: 'DatePickerDemo',
  title: '日期选择器弹窗',
}
</script>
<script setup lang="ts">
import { ref, watch } from 'vue'
import MdDatePicker from 'mand-mobile/date-picker'
import MdField from 'mand-mobile/field'
import MdFieldItem from 'mand-mobile/field-item'

const minDate = new Date('2013/9/9')
const maxDate = new Date('2022/9/9')
const selectedDate = ref(new Date())

const isDatePickerShow = ref(false)
const datePickerValue = ref('')

const onDatePickerConfirm = () => {
  datePickerValue.value = selectedDate.value?.toDateString()
}
</script>

<template>
  <div
    class="
      md-example-child
      md-example-child-date-picker
      md-example-child-date-picker-4
    "
  >
    <md-field>
      <md-field-item
        name="name"
        title="出险时间"
        arrow="arrow-right"
        align="right"
        :content="datePickerValue"
        @click="isDatePickerShow = true"
      >
      </md-field-item>
    </md-field>
    <md-date-picker
      v-model="selectedDate"
      v-model:visible="isDatePickerShow"
      :min-date="minDate"
      :max-date="maxDate"
      title="请选择出险时间"
      @confirm="onDatePickerConfirm"
    ></md-date-picker>
  </div>
</template>
