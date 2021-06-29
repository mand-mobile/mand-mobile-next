<template>
  <!-- eslint-disable vue/no-v-html -->
  <div class="md-action-sheet">
    <md-popup
      v-model="popupShow"
      position="bottom"
      prevent-scroll
      @show="onShow"
      @hide="onHide"
    >
      <div class="md-action-sheet-content">
        <div v-if="title" class="md-action-sheet-header">
          {{ title }}
        </div>
        <ul class="md-action-sheet-list">
          <template
            v-for="(item, index) in options"
            :key="index"
          >
            <li
              :class="{
                active: index === currentIndex,
                disabled: index === invalidIndex,
                'md-action-sheet-item': true,
              }"
              @click="onSelect(item)"
            >
              <div class="md-action-sheet-item-wrapper">
                <div
                  class="md-action-sheet-item-section"
                  v-html="item.text || item.label"
                ></div>
              </div>
            </li>
          </template>
          <li
            class="md-action-sheet-cancel"
            @click="cancelHandler"
          >
            {{ cancelText }}
          </li>
        </ul>
      </div>
    </md-popup>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import MdPopup from 'mand-mobile/popup'
import {
  actionSheetProps as props,
  useActionSheet,
  emits,
} from './use-action-sheet'

export default defineComponent({
  name: 'MdActionSheet',
  components: { MdPopup },
  props,
  emits,
  setup(props, context) {
    const {
      hideSheet,
      cancelHandler,
      onHide,
      onShow,
      popupShow,
      currentIndex,
      onSelect,
    } = useActionSheet(props, context)

    return {
      hideSheet,
      cancelHandler,
      onHide,
      onShow,
      popupShow,
      currentIndex,
      onSelect,
    }
  },
})
</script>

<style lang="stylus">
.md-action-sheet
  color action-sheet-color
  -webkit-font-smoothing antialiased
  .md-popup
    z-index action-sheet-zindex
  .md-popup-box
    background-color color-bg-base

.md-action-sheet-content
  position relative
  width 100%
  border-radius 28px 28px 0 0
  background action-sheet-bg
  font-size action-sheet-font-size
  text-align center
  overflow auto

.md-action-sheet-header
  position relative
  vertical-height(action-sheet-height)
  hairline(bottom, color-border-base)
  word-ellipsis()
  overflow visible

.md-action-sheet-item
  position relative
  vertical-height(action-sheet-height)
  padding 0 action-sheet-padding-h
  box-sizing border-box
  font-size action-sheet-font-size
  transition background-color .3s
  -webkit-user-select none
  &.active
    color action-sheet-color-highlight
  &.disabled .md-action-sheet-item-section
    opacity action-sheet-disabled-opacity
  &:first-of-type
    .md-action-sheet-item-wrapper:after
      display none
  &:active
    background-color color-bg-tap
    &.disabled
      background-color transparent

.md-action-sheet-item-wrapper
  position relative
  hairline(top, color-border-base)

.md-action-sheet-cancel
  height 132px
  line-height 120px
  color action-sheet-color-cancel
  font-weight font-weight-medium
  &::before
    display block
    content ''
    height 12px
    background action-sheet-cancel-gap-bg
</style>
