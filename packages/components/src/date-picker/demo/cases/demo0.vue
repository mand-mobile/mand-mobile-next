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
  name: 'date-picker-demo',
  components: {
    'md-date-picker-view': DatePicker,
  },
  data() {
    return {
      minDate: new Date('2013/9/9'),
      maxDate: new Date('2020/9/9'),
      currentDate: new Date(),
    }
  },
  methods: {
    onDatePickerInitialed() {
      console.log(`[Mand Mobile] DatePicker getFormatDate: ${this.$refs.datePicker.getFormatDate('yyyy/MM/dd')}`)
    },
  },
}

</script>
