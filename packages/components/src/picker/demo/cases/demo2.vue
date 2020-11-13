<template>
  <div class="md-example-child md-example-child-picker md-example-child-picker-2">
    <md-field>
      <md-field-item
        title="省市区/县"
        arrow="arrow-right"
        :addon="pickerValue"
        @click="showPicker">
      </md-field-item>
    </md-field>
    <md-picker
      ref="picker"
      v-model="isPickerShow"
      :data="pickerData"
      children-key="data"
      :cols="3"
      is-cascade
      title="选择省市区/县"
      @confirm="onPickerConfirm"
    ></md-picker>
  </div>
</template>

<script>
import Field from 'mand-mobile/lib/field'
import FieldItem from 'mand-mobile/lib/field/item'
import Picker from 'mand-mobile/lib/picker'
import district from 'mand-mobile/lib/picker/demo/data/district'

export default {
  components: {
    'md-picker': Picker,
    'md-field': Field,
    'md-field-item': FieldItem,
  },
  data() {
    return {
      isPickerShow: false,
      pickerData: district,
      pickerValue: '',
    }
  },
  methods: {
    showPicker() {
      this.isPickerShow = true
    },
    onPickerConfirm() {
      const values = this.$refs.picker.getColumnValues()

      let res = ''
      values.forEach(value => {
        value && (res += `${value.text || value.label} `)
      })
      this.pickerValue = res
    },
  },
}
// #region ignore
export const metaInfo = {
  'zh-CN': {
    title: '弹出展示',
  },
  'en-US': {
    title: 'Display in Popup',
  },
}
// #endregion ignore

</script>
