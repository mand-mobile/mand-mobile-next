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
    <md-button type="primary" size="small" inline @click="setColumnData">切换数据</md-button>
  </div>
</template>

<script>
import Button from 'mand-mobile/lib/button'
import PickerView from 'mand-mobile/lib/picker/picker-view'
import district from 'mand-mobile/lib/picker/demo/data/district'
import area from 'mand-mobile/lib/picker/demo/data/area'

export default {
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
    setColumnData() {
      this.pickerDefaultIndex = [0, 0, 0]
      this.pickerData = district
      this.labelKey = 'label'
      this.childrenKey = 'data'
    },
  },
}
// #region ignore
export const metaInfo = {
  'zh-CN': {
    title: '联动数据',
    describe: '默认选中[14, 4, 1]项',
  },
  'en-US': {
    title: 'Cascade',
    describe: '"[14, 4, 1]" item selected by default',
  },
}
// #endregion ignore

</script>

<style>
.md-example-child-picker-1 .picker {
  display: block;
  margin-bottom: 20px;
}
</style>
