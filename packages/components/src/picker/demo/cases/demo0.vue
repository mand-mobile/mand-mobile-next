<template>
  <div class="md-example-child md-example-child-picker md-example-child-picker-0">
    <md-picker-view
      class="picker"
      ref="picker"
      :data="pickerData"
      :default-index="[1]"
      :invalid-index="[[2, 3, 4]]"
      is-vibrate
      @initialed="onPickerInitialed"
      @change="onPickerConfirm"
    ></md-picker-view>
    <md-button type="primary" size="small" inline @click="getColumnValues('picker')">获取选中数据</md-button>
    <md-button type="primary" size="small" inline @click="getColumnIndexs('picker')">获取选中索引</md-button>
  </div>
</template>

<script>
import PickerView from 'mand-mobile/lib/picker/picker-view'
import Button from 'mand-mobile/lib/button'
import Dialog from 'mand-mobile/lib/dialog'
import simple from 'mand-mobile/lib/picker/demo/data/simple'

export default {
  components: {
    'md-picker-view': PickerView,
    'md-button': Button,
  },
  data() {
    return {
      pickerData: simple,
      pickerValue: '',
    }
  },
  methods: {
    onPickerInitialed() {
      const value = this.$refs.picker.getColumnValues()
      console.log(`[Mand Mobile] Picker Initialed: ${JSON.stringify(value)}`)
    },
    onPickerConfirm(columnIndex, itemIndex, value) {
      if (value) {
        this.pickerValue = value.text
      }
    },
    getColumnValues(picker) {
      const value = this.$refs[picker].getColumnValues()
      Dialog.alert({
        content: `${JSON.stringify(value, 2)}`,
      })
    },
    getColumnIndexs(picker) {
      const value = this.$refs[picker].getColumnIndexs()
      Dialog.alert({
        content: `${JSON.stringify(value, 2)}`,
      })
    },
  },
}
// #region ignore
export const metaInfo = {
  'zh-CN': {
    title: '单列数据',
    describe: '禁用2-4项',
  },
  'en-US': {
    title: 'Single column',
    describe: 'Disable 2-4 items',
  },
}
// #endregion ignore

</script>

<style>
.md-example-child-picker-0 .picker {
  display: block;
  margin-bottom: 20px;
}
</style>