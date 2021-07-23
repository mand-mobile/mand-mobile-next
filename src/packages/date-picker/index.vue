<template>
  <div class="md-date-picker">
    <template v-if="isView">
      <md-picker-view
        ref="pickerView"
        v-model="selectedValues"
        :is-view="isView"
        :data="pickerData"
        :cols="cols"
        :keep-index="keepIndex"
        :line-height="lineHeight"
        @change="onPickerChange"
      />
    </template>
    <template v-else>
      <md-popup
        ref="popup"
        v-model="popupShow"
        class="inner-popup"
        position="bottom"
        :mask-closable="maskClosable"
        :prevent-scroll="true"
        @show="onShow"
        @hide="onHide"
        @maskClick="cancelHandler"
      >
        <md-popup-title-bar
          :title="title"
          :describe="describe"
          :ok-text="okText"
          :cancel-text="cancelText"
          :large-radius="largeRadius"
          @confirm="confirmHandler"
          @cancel="cancelHandler"
        ></md-popup-title-bar>
        <md-picker-view
          ref="pickerView"
          v-model="selectedValues"
          :data="pickerData"
          :cols="cols"
          :keep-index="keepIndex"
          :line-height="lineHeight"
          @change="onPickerChange"
        />
      </md-popup>
    </template>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import {
  PickerView,
  popupProps,
} from 'mand-mobile-next/picker'
import {
  Popup,
  PopupTitleBar,
} from 'mand-mobile-next/popup'
import {
  datePickerProps,
  useDatePicker,
  emits,
} from './use-date-picker'

export default defineComponent({
  name: 'MdDatePicker',
  components: {
    MdPopup: Popup,
    MdPopupTitleBar: PopupTitleBar,
    MdPickerView: PickerView,
  },
  props: { ...datePickerProps, ...popupProps },
  emits,
  setup(props, context) {
    const {
      pickerData,
      cols,
      selectedValues,
      onPickerChange,

      popupShow,
      innerValue,
      pickerView,
      onHide,
      onShow,
      cancelHandler,
      confirmHandler,
    } = useDatePicker(props, context)

    const getColumnValues = () => {
      return pickerView.value?.getColumnValues()
    }

    return {
      pickerData,
      cols,
      selectedValues,
      onPickerChange,

      popupShow,
      innerValue,
      pickerView,
      onHide,
      onShow,
      cancelHandler,
      confirmHandler,
      getColumnValues,
    }
  },
})
</script>

<style lang="stylus"></style>
