<template>
  <md-popup
    v-model="popupShow"
    class="md-tab-picker"
    position="bottom"
    :mask-closable="maskClosable"
    :prevent-scroll="true"
    @hide="onHide"
    @show="onShow"
  >
    <slot name="title">
      <md-popup-title-bar
        :title="title"
        :describe="describe"
        only-close
        @cancel="hide"
      ></md-popup-title-bar>
    </slot>

    <div
      class="md-tab-picker-content"
      :style="{
        height,
      }"
    >
      <md-tabs ref="tabs">
        <md-tab-pane
          v-for="(pane, index) in panes"
          :key="pane.name + index"
          :name="pane.name"
          :label="pane.label"
        >
          <md-radio-list
            v-model="innerValue[index]"
            :options="pane.options"
            :is-slot-scope="!!$slots.default"
            icon=""
            icon-inverse=""
            icon-position="right"
            @change="changeHandler(pane.options, index)"
          >
            <template #default="{ option }">
              <slot :option="option"></slot>
            </template>
          </md-radio-list>
        </md-tab-pane>
      </md-tabs>
    </div>
  </md-popup>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import {
  Popup,
  PopupTitleBar,
} from 'mand-mobile-next/popup'
import MdTabs from 'mand-mobile-next/tabs'
import MdTabPane from 'mand-mobile-next/tab-pane'
import MdRadioList from 'mand-mobile-next/radio-list'
import {
  tabPickerProps as props,
  emits,
  useTabPicker,
} from './use-tab-picker'

export default defineComponent({
  name: 'MdTabPicker',
  components: {
    MdPopup: Popup,
    MdPopupTitleBar: PopupTitleBar,
    MdTabs,
    MdTabPane,
    MdRadioList,
  },
  props,
  emits,
  setup(props, context) {
    const {
      popupShow,
      onHide,
      onShow,
      hide,
      tabsRef: tabs,
      panes,
      innerValue,
      changeHandler,
    } = useTabPicker(props, context)

    return {
      popupShow,
      onHide,
      onShow,
      hide,
      tabs,
      panes,
      innerValue,
      changeHandler,
    }
  },
})
</script>

<style lang="stylus">
@import './index.styl'

.md-tab-picker
  z-index var(--md-tab-picker-zindex)
  .md-tab-bar
    position relative
    margin-left var(--md-tab-picker-h-gap)
    margin-right var(--md-tab-picker-h-gap)
    padding-left 0
    padding-right 0
    background-color var(--md-tab-picker-bg)
    hairline(bottom, var(--md-color-border-base))
  .md-tabs-content
    height var(--md-tab-picker-height)
    overflow auto
    -webkit-overflow-scrolling touch
    &::-webkit-scrollbar
      display none
  .md-tab-bar-list
    justify-content flex-start
    .md-tab-bar-item
      flex none
      margin 0 0
      padding 0 30px
      font-size var(--md-font-caption-normal)
  .md-tab-pane
    padding-left var(--md-tab-picker-h-gap)
    padding-right var(--md-tab-picker-h-gap)
    box-sizing border-box
  .md-popup-cancel
    width 90px !important
.md-tab-picker-content
  background-color var(--md-tab-picker-bg)
  .md-radio-item.is-selected
    .md-cell-item-body .md-cell-item-title
      color var(--md-radio-color)
  .md-tabs
    display flex
    flex-direction column
    height calc(100% - 100px)
    .md-tab-pane
      height 100%
      overflow auto
      &::-webkit-scrollbar
        display none
</style>
