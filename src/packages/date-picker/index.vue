<template>
  <div class="md-date-picker">
    <md-picker
      ref="pickerRef"
      v-model="selectedValues"
      :data="pickerData"
      :cols="cols"
      :keep-index="keepIndex"
      :line-height="lineHeight"
      @change="onPickerChange"
    />
  </div>
</template>

<script lang="ts">
import {
  defineComponent,
  ref,
  ComponentPublicInstance,
} from 'vue'
import MdPicker from 'mand-mobile/picker'
import {
  datePickerProps,
  useDatePicker,
} from './use-date-picker'

export default defineComponent({
  name: 'MdDatePicker',
  components: { MdPicker },
  props: datePickerProps,
  setup(props) {
    const {
      pickerRef,
      pickerData,
      cols,
      selectedValues,
      onPickerChange,
    } = useDatePicker(props)

    return {
      pickerRef,
      pickerData,
      cols,
      selectedValues,
      onPickerChange,
    }
  },
})
</script>

<style lang="stylus"></style>
