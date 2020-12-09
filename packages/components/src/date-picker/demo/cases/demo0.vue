<template>
  <div class="md-example-child md-example-child-date-picker md-example-child-date-picker-0">
    <md-date-picker-view
      ref="datePicker"
      today-text="今天"
      :min-date="minDate"
      :max-date="maxDate"
      :default-date="currentDate"
      keep-index
      @initialed="onDatePickerInitialed"
    ></md-date-picker-view>
  </div>
</template>

<script>
import DatePicker from 'mand-mobile/lib/date-picker/date-picker-view'

export default {
  components: {
    'md-date-picker-view': DatePicker,
  },
  data() {
    return {
      minDate: new Date('2013/9/9'),
      maxDate: new Date('2030/9/9'),
      currentDate: new Date(),
    }
  },
  methods: {
    onDatePickerInitialed() {
      console.log(`[Mand Mobile] DatePicker getFormatDate: ${this.$refs.datePicker.getFormatDate('yyyy/MM/dd')}`)
    },
  },
}
// #region ignore
export const metaInfo = {
  'zh-CN': {
    title: '日期选择',
    describe: '2013/9/9 - 2030/9/9',
  },
  'en-US': {
    title: 'Date selection',
    describe: '2013/9/9 - 2030/9/9',
  },
}
// #endregion ignore

</script>
