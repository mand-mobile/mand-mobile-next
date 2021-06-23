<template>
  <div ref="menu" class="md-drop-menu">
    <div class="md-drop-menu-bar">
      <div
        v-for="(item, index) in data"
        :key="index"
        class="bar-item"
        :class="{
          active: index === activeMenuBarIndex,
          selected: checkBarItemSelect(index),
          disabled: item.disabled,
        }"
        @click="onBarItemClick(item, index)"
      >
        <span v-text="getBarItemText(item, index)"></span>
      </div>
    </div>
    <md-popup
      v-model="isPopupShow"
      position="top"
      prevent-scroll
      :append-to-body="false"
      @show="onListShow"
      @hide="onListHide"
      @before-hide="onListBeforeHide"
    >
      <div ref="drop" class="md-drop-menu-list">
        <md-radio-list
          v-model="
            selectedMenuListValue[activeMenuBarIndex]
          "
          :options="activeMenuListData"
          :is-slot-scope="hasSlot"
          align-center
          @change="onListItemClick"
        >
          <template #default="{ option }">
            <slot :option="option"></slot>
          </template>
        </md-radio-list>
      </div>
    </md-popup>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
import Popup from 'mand-mobile/popup'
import { RadioList as MdRadioList } from 'mand-mobile/radio'
import {
  SHOW_EVENT,
  HIDE_EVENT,
  CHANGE_EVENT,
} from 'mand-mobile/utils'
import { useDropMenu } from './use-drop-menu'

export default defineComponent({
  name: 'MdDropMenu',
  components: {
    MdPopup: Popup,
    MdRadioList,
  },
  props: {
    data: {
      type: Array as PropType<
        Array<{
          text: string
          options: Array<{
            value: string
            text: string
          }>
          disabled?: boolean
          [key: string]: any
        }>
      >,
      default: () => [],
    },
    defaultValue: {
      type: Array,
      default: () => [],
    },
  },
  emits: [SHOW_EVENT, HIDE_EVENT, CHANGE_EVENT],
  setup(props, context) {
    const {
      hasSlot,
      isPopupShow,

      onListShow,
      onListHide,
      onListItemClick,
      onListBeforeHide,
      activeMenuListData,

      getBarItemText,
      onBarItemClick,
      checkBarItemSelect,
      activeMenuBarIndex,
      selectedMenuListValue,

      scroller,
      boxRef: box,
      menuRef: menu,
    } = useDropMenu(props, context)
    return {
      hasSlot,
      isPopupShow,

      onListShow,
      onListHide,
      onListItemClick,
      onListBeforeHide,
      activeMenuListData,

      getBarItemText,
      onBarItemClick,
      checkBarItemSelect,
      activeMenuBarIndex,
      selectedMenuListValue,

      scroller,
      box,
      menu,
    }
  },
})
</script>

<style lang="stylus">
.md-drop-menu
  position fixed
  z-index drop-menu-zindex
  top 0
  left 0
  right 0
  height drop-menu-height
  box-sizing border-box
  color color-text-minor
  font-size drop-menu-font-size
  font-weight drop-menu-font-weight

.md-drop-menu-bar
  position relative
  z-index drop-menu-zindex
  display flex
  height 100%
  background drop-menu-bar-bg
  hairline(bottom, drop-menu-bar-border-color)
  .bar-item
    display flex
    flex 1
    margin 2% 0
    align-items center
    justify-content center
    span
      position relative
      padding-right 30px
      &:after
        content ""
        position absolute
        right 0
        top 50%
        width 0
        height 0
        margin-top -4px
        border-left solid 8px transparent
        border-right solid 8px transparent
        border-top solid 9px color-border-element
        transition transform .3s ease-in-out-quint
    &.active
      color drop-menu-color
      span:after
        transform rotate(180deg)
        border-top-color drop-menu-color
    &.selected
      color drop-menu-color
    &.disabled
      opacity drop-menu-disabled-opacity

.md-drop-menu-list
  width 100%
  padding-top drop-menu-height
  background drop-menu-list-bg
  box-sizing border-box
  .md-radio-item
    font-weight font-weight-normal
    &.is-selected .md-cell-item-title
      color color-primary
</style>
