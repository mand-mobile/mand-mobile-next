<template>
  <div class="md-action-sheet">
    <md-popup
      v-model="isActionSheetShow"
      position="bottom"
      isInner="true"
      prevent-scroll
      @show="$_onShow"
      @hide="$_onHide"
    >
      <div class="md-action-sheet_content">
        <header class="md-action-sheet_header" v-if="title">{{ title }}</header>
        <ul class="md-action-sheet_list">
          <template v-for="(item, index) in options">
            <li
              :key="index"
              :class="{
                'md-action-sheet_item--active': index === clickIndex,
                'md-action-sheet_item--disabled': index=== invalidIndex,
                'md-action-sheet_item': true
              }"
              @click="$_onSelect(item, index)"
            >
              <div class="md-action-sheet_item_wrapper">
                <div class="md-action-sheet_item_section" v-html="item.text || item.label"></div>
              </div>
            </li>
          </template>
          <li class="md-action-sheet_cancel" @click="$_onCancel">{{ cancelText }}</li>
        </ul>
      </div>
    </md-popup>
  </div>
</template>

<script>
import {inArray} from '@mand-mobile/shared/lib/util'
import Popup from '../popup'

export default {
  name: 'md-action-sheet',

  components: {
    'md-popup': Popup,
  },

  props: {
    value: {
      type: Boolean,
      default: false,
    },
    title: {
      type: String,
      default: '',
    },
    options: {
      type: Array,
      default() {
        return []
      },
    },
    defaultIndex: {
      type: Number,
      default: -1,
    },
    invalidIndex: {
      type: Number,
      default: -1,
    },
    cancelText: {
      type: String,
      default: '取消',
    },
  },

  data() {
    return {
      isActionSheetShow: this.value,
      clickIndex: -1,
      scroller: '',
    }
  },

  watch: {
    value(newVal) {
      this.isActionSheetShow = newVal
    },
  },

  created() {
    this.clickIndex = this.defaultIndex
  },

  methods: {
    // MARK: events handler, 如 $_onButtonClick
    $_onShow() {
      this.$emit('show')
    },
    $_onHide() {
      this.$emit('hide')
      this.$_hideSheet()
    },
    $_onSelect(item, index) {
      if (index === this.invalidIndex || inArray(this.invalidIndex, index)) {
        return
      }
      this.clickIndex = index
      this.$emit('selected', item)
      this.$_hideSheet()
    },
    $_onCancel() {
      this.$emit('cancel')
      this.$_hideSheet()
    },
    $_hideSheet() {
      this.isActionSheetShow = false
      this.$emit('input', false)
    },
  },
}

</script>

<style lang="stylus">
.md-action-sheet
  color md-action-sheet-color
  -webkit-font-smoothing antialiased
  .md-popup
    z-index md-action-sheet-zindex
  .md-popup_box
    background-color md-color-bg-base

.md-action-sheet_content
  position relative
  width 100%
  font-size md-action-sheet-font-size
  background md-action-sheet-bg
  text-align center
  overflow auto

.md-action-sheet_header
  position relative
  vertical-height(md-action-sheet-height)
  hairline(bottom, md-color-border-base)
  word-ellipsis()
  overflow visible

.md-action-sheet_item
  position relative
  vertical-height(md-action-sheet-height)
  padding 0 md-action-sheet-padding-h
  box-sizing border-box
  font-size md-action-sheet-font-size
  transition md-background-color .3s
  -webkit-user-select none
  &--active
    color md-action-sheet-color-highlight
  &--disabled .md-action-sheet_item_section
    opacity md-action-sheet-disabled-opacity
  &:first-of-type
    .md-action-sheet_item_wrapper:after
      display none
  &:active
    background-color md-color-bg-tap
    &--disabled
      background-color transparent

  &_wrapper
    position relative
    hairline(top, md-color-border-base)

.md-action-sheet_cancel
  height 132px
  line-height 120px
  color md-action-sheet-color-cancel
  font-weight md-font-weight-medium
  &::before
    display block
    content ''
    height 12px
    background md-action-sheet-cancel-gap-bg
</style>
