<template>
  <div class="md-picker-view">
    <div
      class="md-picker-view_container"
      :style="{
        height: `${indicatorHeight + 2 * maskerHeight}px`,
      }"
    >
      <div
        class="
          md-picker-view_masker md-picker-view_masker--top
        "
        :style="{ height: `${maskerHeight}px` }"
      ></div>
      <div
        class="
          md-picker-view_masker
          md-picker-view_masker--bottom
        "
        :style="{ height: `${maskerHeight}px` }"
      ></div>
      <div class="md-picker-view_wheel_wrapper">
        <div
          v-for="(columnData, i) in pickerData"
          :ref="setWheelsRef"
          :key="i"
          class="md-picker-view_wheel_column"
        >
          <ul
            class="md-picker-view_wheel"
            :style="{
              marginTop: `${maskerHeight}px`,
            }"
          >
            <li
              v-for="(item, j) in columnData"
              :key="item.value"
              class="md-picker-view_wheel--item"
              :class="{
                active:
                  j ===
                  (selectedIndexs && selectedIndexs[i]),
                'md-picker-view_wheel--disabled-item':
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
} from 'mand-mobile-next/utils'
import { pickerProps, usePicker } from './use-picker'

export default defineComponent({
  name: 'MdPickerView',
  props: pickerProps,
  emits: [UPDATE_MODEL_EVENT, CHANGE_EVENT],
  setup(props, context) {
    const {
      pickerData,
      selectedIndexs,
      maskerHeight,
      indicatorHeight,
      setWheelsRef,
      checkInvalid,

      resetWheel,
      destroyWheel,
      getWheelInstance,
      getColumnValues,
    } = usePicker(props, context)

    return {
      pickerData,
      selectedIndexs,
      maskerHeight,
      indicatorHeight,
      setWheelsRef,
      checkInvalid,

      resetWheel,
      destroyWheel,
      getWheelInstance,
      getColumnValues,
    }
  },
})
</script>

<style lang="stylus">
@import './index.styl'

.md-picker-view
  position relative
  width 100%
  padding 0 var(--md-picker-padding-h)
  background var(--md-color-bg-inverse)
  box-sizing border-box
  transform translate3d(0, 0, 0)
  .md-picker-view_container
    position relative
    height 100%
    overflow hidden
    .md-picker-view_masker
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
          border-bottom solid 1px var(--md-picker-border-color)
          transform-origin 0 bottom
      &--bottom
        bottom 0
        &:before
          top 0
          border-top solid 1px var(--md-picker-border-color)
          transform-origin 0 top
    .md-picker-view_wheel_wrapper
      display flex
      z-index 10
    .md-picker-view_wheel_column
      position relative
      flex 1
      overflow hidden
    .md-picker-view_wheel
      margin-top 100px
      &--item
        width 100%
        padding 0 var(--md-h-gap-sm)
        box-sizing border-box
        color var(--md-picker-color)
        font-size var(--md-picker-font-size)
        text-align center
        word-ellipsis()
        &.active
          color var(--md-picker-color-active)
          font-weight var(--md-picker-font-weight-active)
      &--disabled-item
        opacity var(--md-picker-disabled-opacity)
</style>
