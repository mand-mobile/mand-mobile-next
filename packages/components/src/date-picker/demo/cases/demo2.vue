<template>
  <div class="md-example-child md-example-child-date-picker md-example-child-date-picker-2">
    <md-date-picker-view
      class="picker"
      ref="datePicker"
      type="datetime"
      :default-date="currentDate"
      keep-index
    ></md-date-picker-view>
    <md-button type="primary" size="small" inline @click="getFormatDate">获取选中</md-button>
  </div>
</template>

<script>
import DatePicker from 'mand-mobile/lib/date-picker/date-picker-view'
import Dialog from 'mand-mobile/lib/dialog'
import Button from 'mand-mobile/lib/button'

export default {
  name: 'date-picker-demo',
  components: {
    'md-date-picker-view': DatePicker,
    'md-button': Button,
  },
  data() {
    return {
      currentDate: new Date(),
    }
  },
  methods: {
    getFormatDate() {
      Dialog.alert({
        content: this.$refs.datePicker.getFormatDate(),
      })
    },
  },
}
// #region ignore
export const metaInfo = {
  'zh-CN': {
    title: '日期时间选择',
  },
  'en-US': {
    title: 'Date & Time selection',
  },
}
// #endregion ignore

</script>

<style>
.md-example-child-date-picker-2 .picker {
  display: block;
  margin-bottom: 20px;
}
</style>
