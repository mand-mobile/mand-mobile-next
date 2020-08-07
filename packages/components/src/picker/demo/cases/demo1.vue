<template>
  <div class="md-example-child md-example-child-picker md-example-child-picker-1">
    <md-picker-view
      class="picker"
      ref="picker"
      :data="pickerData"
      :label-key="labelKey"
      :children-key="childrenKey"
      :cols="3"
      :default-index="pickerDefaultIndex"
      :default-value="pickerDefaultValue"
      is-view
      is-cascade
      @initialed="onPickerInitialed"
      @change="onPickerChange"
    ></md-picker-view>
    <md-button type="primary" size="small" inline @click="onChangeData">切换数据</md-button>
  </div>
</template>

<script>
import Button from 'mand-mobile/lib/button'
import PickerView from 'mand-mobile/lib/picker/picker-view'
import district from 'mand-mobile/lib/picker/demo/data/district'
import area from 'mand-mobile/lib/picker/demo/data/area'

export default {
  name: 'picker-demo',
  components: {
    'md-picker-view': PickerView,
    'md-button': Button,
  },
  data() {
    return {
      // pickerData: [],
      // pickerDefaultIndex: [],
      pickerData: area,
      pickerDefaultIndex: [14, 4, 1],
      pickerDefaultValue: [],
      labelKey: 'name',
      childrenKey: 'children',
    }
  },
  mounted() {
    // window.PickerTrigger3 = () => {
    //   this.getColumnValue('picker', 0)
    // }
    // window.PickerTrigger4 = () => {
    //   this.getColumnIndex('picker', 0)
    // }
    // window.PickerTrigger5 = () => {
    //   this.pickerDefaultIndex = []
    //   this.pickerDefaultValue = ['110000', '110100', '110101']
    //   setTimeout(() => {
    //     this.$refs.picker.refresh()
    //   }, 0)
    // }
  },
  methods: {
    onPickerInitialed() {
      const columnValues = this.$refs.picker.getColumnValues()
      let value = ''
      columnValues.forEach(item => {
        value += `${item ? item.name : ''}-`
      })
      console.log(`[Mand Mobile] Picker Initial Values: ${value.substr(0, value.length - 1)}`)
    },
    onPickerChange(columnIndex, itemIndex, value) {
      if (value) {
        this.pickerValue = value.text
      }
      console.log(`[Mand Mobile] Picker getColumnValues: ${JSON.stringify(value)}`)
    },
    onChangeData() {
      this.pickerDefaultIndex = [0, 0, 0]
      this.pickerData = district
      this.labelKey = 'label'
      this.childrenKey = 'data'
    },
    getColumnValue(picker, index) {
      const value = this.$refs.picker.getColumnValue(index)
      delete value.children
      // Dialog.alert({
      //   content: JSON.stringify(value),
      // })
    },
    getColumnIndex(picker, index) {
      const value = this.$refs.picker.getColumnIndex(index)
      console.log(`[Mand Mobile] Picker getColumnIndex: ${JSON.stringify(value)}`)
      // Dialog.alert({
      //   content: `<pre>${JSON.stringify(value)}</pre>`,
      // })
    },
  },
}

</script>

<style>
.md-example-child-picker-1 .picker {
  display: block;
  margin-bottom: 20px;
}
</style>
