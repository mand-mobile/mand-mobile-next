<template>
  <div class="md-example-child md-example-child-date-picker md-example-child-date-picker-2">
    <md-date-picker-view
      ref="datePicker"
      type="datetime"
      :default-date="currentDate"
      keep-index
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
      currentDate: new Date(),
    }
  },
  mounted() {
    // window.triggerDatePicker0 = () => {
    //   Dialog.alert({
    //     content: this.$refs.datePicker.getFormatDate(),
    //   })
    // }
  },
}

</script>
