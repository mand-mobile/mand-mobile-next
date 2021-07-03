<template>
  <div class="md-tab-bar">
    <div ref="wrapper" class="md-tab-bar-inner">
      <template v-if="scrollable">
        <div
          v-show="maskStartShown"
          class="md-tab-bar-start"
        ></div>
        <div
          v-show="maskEndShown"
          class="md-tab-bar-end"
        ></div>
      </template>
      <div ref="content" class="md-tab-bar-list">
        <a
          v-for="(item, index) in items"
          :key="index"
          ref="items"
          class="md-tab-bar-item"
          :class="{
            'is-active': modelValue === item.name,
            'is-disabled': !!item.disabled,
          }"
          @click="clickHandle(item, index)"
          @tap="clickHandle(item, index)"
        >
          <slot
            :item="item"
            :items="items"
            :index="index"
            :currentName="modelValue"
            >{{ item.label }}</slot
          >
        </a>
        <span
          v-if="hasInk"
          class="md-tab-bar-ink"
          :class="{
            'is-disabled':
              items[modelIndex] &&
              items[modelIndex].disabled,
          }"
          :style="{
            width: inkWidth,
            transform: `translateX(${inkOffsetLeft})`,
          }"
        ></span>
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
import { tabBarProps, useTabBar } from './use-tab-bar'
import type { PropsItem } from './use-tab-bar'

export default defineComponent({
  name: 'MdTabBar',
  props: tabBarProps,
  emits: [CHANGE_EVENT, UPDATE_MODEL_EVENT],
  setup(props, context) {
    const {
      wrapRef,
      contentRef,
      scrollable,
      maskStartShown,
      maskEndShown,
      clickHandle,
      modelIndex,
      inkWidth,
      inkOffsetLeft,
      setInkStyle,
    } = useTabBar(props, context)

    return {
      wrapper: wrapRef,
      content: contentRef,

      scrollable,
      maskStartShown,
      maskEndShown,

      modelIndex,
      clickHandle,
      inkWidth,
      inkOffsetLeft,
      setInkStyle,
    }
  },
})
</script>

<style lang="stylus">
.md-tab-bar
  position relative
  padding-left tab-offset
  padding-right tab-offset
  background-color tab-bg

.md-tab-bar-inner
  position relative
  width 100%
  overflow hidden
  white-space nowrap

.md-tab-bar-list
  position relative
  display flex
  justify-content space-between
  min-width 100%

.md-tab-bar-item
  flex auto
  flex-shrink 0
  position relative
  display inline-flex
  align-items center
  justify-content center
  color tab-text-color
  font-size tab-font-size
  font-weight tab-font-weight
  min-height tab-height
  padding 0 tab-item-gap
  margin 0 auto
  transition all 300ms
  box-sizing border-box
  -webkit-user-select none
  -webkit-tap-highlight-color transparent
  &.is-active
    color tab-active-color
  &.is-disabled
    color tab-disabled-color

.md-tab-bar-ink
  position absolute
  bottom 0
  left 0
  display block
  height tab-ink-height
  background-color tab-active-color
  transition all 300ms
  &.is-disabled
    background-color tab-disabled-color

.md-tab-bar-start,
.md-tab-bar-end
  position absolute
  top 0
  left 0
  width 14px
  height tab-height
  overflow hidden
  &::after
    content ''
    display block
    position absolute
    left -14px
    top 50%
    width 14px
    if tab-height is a 'unit'
      margin-top 0 - tab-height * 0.4
      height tab-height * 0.8
    else
      margin-top "calc(0 - %s * 0.4)" % tab-height
      height "calc(%s * 0.8)" % tab-height
    border-radius 50%
    box-shadow: -1px 0 12px 0 rgba(0,0,0,0.2)
.md-tab-bar-end
  left auto
  right 0
  transform rotate(180deg)

.md-tab-bar
  .md-scroll-view
    display block
  .scroll-view-container
    min-width 100%
</style>
