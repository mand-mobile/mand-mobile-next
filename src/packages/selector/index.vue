<template>
  <md-popup
    v-model="popupShow"
    class="md-selector"
    :class="{
      'is-normal': !isCheck,
      'is-check': isCheck,
    }"
    position="bottom"
    :mask-closable="maskClosable"
    :prevent-scroll="true"
    :prevent-scroll-exclude="content"
    @hide="onHide"
    @show="onShow"
  >
    <slot name="title">
      <md-popup-title-bar
        v-show="!hideTitleBar || okText !== ''"
        :title="title"
        :describe="describe"
        :ok-text="okText"
        :cancel-text="cancelText"
        :only-close="
          !isCheck && okText === '' && !cancelText
        "
        @confirm="confirmHandler"
        @cancel="cancelHandler"
      ></md-popup-title-bar>
    </slot>

    <div
      ref="content"
      class="md-selector-container"
      :style="{
        maxHeight: `${maxHeight}`,
        minHeight: `${minHeight}`,
      }"
      @touchstart.stop
      @touchmove.stop
      @touchend.stop
    >
      <!-- <md-scroll-view
        ref="scroller"
        :is-prevent="false"
        :style="{
          maxHeight: `${maxHeight}`,
          minHeight: `${minHeight}`,
        }"
      > -->
      <slot name="header"></slot>
      <template v-if="!Array.isArray(innerValue)">
        <md-radio-list
          v-model="innerValue"
          class="md-selector-list"
          :options="data"
          :is-slot-scope="!!$slots.default"
          :icon="icon"
          :icon-disabled="iconDisabled"
          :icon-inverse="iconInverse"
          :icon-position="iconPosition"
          :icon-size="iconSize"
          :icon-svg="iconSvg"
        >
          <template #default="{ option, index, selected }">
            <slot
              :option="option"
              :index="index"
              :selected="selected"
            ></slot>
          </template>
        </md-radio-list>
      </template>
      <!-- multi -->
      <template v-else>
        <md-check-list
          v-model="innerValue"
          class="md-selector-list"
          :options="data"
          :is-slot-scope="!!$slots.default"
          :icon="icon"
          :icon-disabled="iconDisabled"
          :icon-inverse="iconInverse"
          :icon-position="iconPosition"
          :icon-size="iconSize"
          :icon-svg="iconSvg"
        >
          <template #default="{ option, index, selected }">
            <slot
              :option="option"
              :index="index"
              :selected="selected"
            ></slot>
          </template>
        </md-check-list>
      </template>
      <slot name="footer"></slot>
      <!-- </md-scroll-view> -->
    </div>
  </md-popup>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { Popup, PopupTitleBar } from 'mand-mobile/popup'
// import MdScrollView from 'mand-mobile/scroll-view'
import MdRadioList from 'mand-mobile/radio-list'
import MdCheckList from 'mand-mobile/check-list'
import {
  selectorProps as props,
  emits,
  useSelector,
} from './use-selector'

export default defineComponent({
  name: 'MdSelector',
  components: {
    MdPopup: Popup,
    MdPopupTitleBar: PopupTitleBar,
    // MdScrollView,
    MdRadioList,
    MdCheckList,
  },
  props,
  emits,
  setup(props, context) {
    const {
      popupShow,
      onHide,
      onShow,
      cancelHandler,
      confirmHandler,
      innerValue,
      scroller,
      content,
    } = useSelector(props, context)

    return {
      popupShow,
      onHide,
      onShow,
      cancelHandler,
      confirmHandler,
      innerValue,
      scroller,
      content,
    }
  },
})
</script>

<style lang="stylus">
.md-selector
  .md-popup
    z-index selector-zindex
  .md-radio-item
    padding-left h-gap-sl
    padding-right h-gap-sl
    transition background-color .3s
    .md-cell-item-body.multilines .md-cell-item-title
      font-weight font-weight-normal
    &.is-selected
      .md-cell-item-title
        color color-primary
    &:active
      background-color color-bg-tap
  &.is-check
    .md-radio-item.is-selected
      .md-cell-item-title
        color inherit
  .md-check-item
    padding-left h-gap-sl
    padding-right h-gap-sl


.md-selector-container
  background-color color-bg-inverse
  padding-bottom calc(constant(safe-area-inset-bottom))
  padding-bottom calc(env(safe-area-inset-bottom))
  overflow auto
  &::-webkit-scrollbar
    display none

.md-selector
  &.is-normal
    .md-radio-item
      text-align center
      .md-cell-item-left,
      .md-cell-item-right
        display none
</style>
