<script lang="ts">
export default {
  name: 'PickerDemo',
  title: '选择器弹窗',
}
</script>
<script setup lang="ts">
import { ref } from 'vue'
import MdPicker from 'mand-mobile-next/picker'
import MdField from 'mand-mobile-next/field'
import MdFieldItem from 'mand-mobile-next/field-item'
import yearData from './data/simple'
import areaData from './data/area'

const isPickerShow0 = ref(false)
const isPickerShow1 = ref(false)
const picker0 = ref(null)
const picker1 = ref(null)
const pickerData0 = ref(yearData)
const pickerData1 = ref(areaData)
const pickerValue0 = ref<Array<string | number>>([3, 1])
const pickerValue1 = ref<Array<string | number>>([1, 2])

const pickerText = ref<string[]>([])

const onPickerConfirm = (index: number) => {
  const picker = eval(`picker${index}.value`)
  const values = picker?.getColumnValues()
  const textArr = values.map((value: any) => {
    return value?.text
  })
  pickerText.value[index] = textArr.join(', ')
}
</script>

<template>
  <div
    class="
      md-example-child
      md-example-child-picker
      md-example-child-picker-2
    "
  >
    <md-field>
      <md-field-item
        title="起保年份"
        arrow="arrow-right"
        :addon="pickerText[0]"
        @click="isPickerShow0 = true"
      >
      </md-field-item>
      <md-field-item
        title="省市区/县"
        arrow="arrow-right"
        :addon="pickerText[1]"
        @click="isPickerShow1 = true"
      >
      </md-field-item>
    </md-field>
    <md-picker
      ref="picker0"
      v-model="pickerValue0"
      v-model:visible="isPickerShow0"
      title="选择起保年份"
      :data="pickerData0"
      :cols="2"
      @confirm="onPickerConfirm(0)"
    />
    <md-picker
      ref="picker1"
      v-model="pickerValue1"
      v-model:visible="isPickerShow1"
      title="选择省市区/县"
      :data="pickerData1"
      :cols="3"
      :is-cascade="true"
      @confirm="onPickerConfirm(1)"
    />
  </div>
</template>
