<template>
  <div class="md-example-child md-example-child-date-picker md-example-child-date-picker-1">
    <md-date-picker-view
      type="time"
      :unit-text="unit"
      :minute-step="1"
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
      unit: ['', '', '', "'", "''"],
    }
  },
}

</script>