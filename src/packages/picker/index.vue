<template>
  <div class="md-picker">
    <div
      class="md-picker_container"
      :style="{
        height: `${indicatorHeight + 2 * maskerHeight}px`,
      }"
    >
      <div
        class="md-picker_masker md-picker_masker--top"
        :style="{ height: `${maskerHeight}px` }"
      ></div>
      <div
        class="md-picker_masker md-picker_masker--bottom"
        :style="{ height: `${maskerHeight}px` }"
      ></div>
      <div class="md-picker_wheel_wrapper">
        <div
          v-for="(columnData, i) in pickerData"
          :ref="setWheelsRef"
          :key="i"
          class="md-picker_wheel_column"
        >
          <ul
            class="md-picker_wheel"
            :style="{
              marginTop: `${maskerHeight}px`,
            }"
          >
            <li
              v-for="(item, j) in columnData"
              :key="item.value"
              class="md-picker_wheel--item"
              :class="{
                active:
                  j ===
                  (selectedIndexs && selectedIndexs[i]),
                'md-picker_wheel--disabled-item':
                  checkInvalid(i, item),
              }"
              :style="{
                height: `${indicatorHeight}px`,
                lineHeight: `${indicatorHeight}px`,
              }"
            >
              {{ item.text }}
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import {
  UPDATE_MODEL_EVENT,
  CHANGE_EVENT,
} from 'mand-mobile/utils'
import { pickerProps, usePicker } from './use-picker'

export default defineComponent({
  name: 'MdPicker',
  props: pickerProps,
  emits: [UPDATE_MODEL_EVENT, CHANGE_EVENT],
  setup(props) {
    const {
      pickerData,
      selectedIndexs,
      maskerHeight,
      indicatorHeight,
      setWheelsRef,
      checkInvalid,
    } = usePicker(props)

    return {
      pickerData,
      selectedIndexs,
      maskerHeight,
      indicatorHeight,
      setWheelsRef,
      checkInvalid,
    }
  },
})
</script>

<style lang="stylus">
.md-picker
  .md-picker_container
    position relative
    height 100%
    overflow hidden
    .md-picker_masker
      position absolute
      height 100px
      left 0
      right 0
      &:before, &:after
        content ""
        width 100%
        display block
        position absolute
        transform-origin 0 0
      &--top
        top 0
        &:after
          bottom: 0
          border-bottom solid 1px picker-border-color
          transform-origin 0 bottom
      &--bottom
        bottom 0
        &:before
          top 0
          border-top solid 1px picker-border-color
          transform-origin 0 top
    .md-picker_wheel_wrapper
      display flex
      z-index 10
    .md-picker_wheel_column
      position relative
      flex 1
      overflow hidden
    .md-picker_wheel
      margin-top 100px
      &--item
        width 100%
        padding 0 h-gap-sm
        box-sizing border-box
        color picker-color
        font-size picker-font-size
        text-align center
        word-ellipsis()
        &.active
          color picker-color-active
          font-weight picker-font-weight-active
      &--disabled-item
        opacity picker-disabled-opacity
</style>
