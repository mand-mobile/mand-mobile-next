<template>
  <div class="md-picker">
    <template v-if="isView">
      <md-picker-view
        ref="pickerView"
        v-model="innerValue"
        :data="data"
        :cols="cols"
        :invalid-value="invalidValue"
        :is-cascade="isCascade"
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
          v-model="innerValue"
          :data="data"
          :cols="cols"
          :invalid-value="invalidValue"
          :is-cascade="isCascade"
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
import { Popup, PopupTitleBar } from 'mand-mobile/popup'
import PickerView from './picker-view.vue'
import { pickerProps } from './use-picker'
import { popupProps, usePopup, emits } from './use-popup'

export default defineComponent({
  name: 'MdPicker',
  components: {
    MdPopup: Popup,
    MdPopupTitleBar: PopupTitleBar,
    MdPickerView: PickerView,
  },
  props: { ...pickerProps, ...popupProps },
  emits,
  setup(props, context) {
    const {
      popupShow,
      innerValue,
      pickerView,
      onHide,
      onShow,
      cancelHandler,
      confirmHandler,
      onPickerChange,
    } = usePopup(props, context)

    const getColumnValues = () => {
      return pickerView.value?.getColumnValues()
    }

    return {
      popupShow,
      innerValue,
      pickerView,

      onHide,
      onShow,
      cancelHandler,
      confirmHandler,
      onPickerChange,
      getColumnValues,
    }
  },
})
</script>

<style lang="stylus">
@import './index.styl'

.md-picker
  width 100%
  .md-popup
    z-index picker-zindex
</style>
