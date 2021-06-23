<template>
  <teleport to="body" :disabled="!appendToBody">
    <div
      v-show="isPopupShow"
      class="md-popup"
      :class="[hasMask ? 'with-mask' : '', position]"
    >
      <!-- mask -->
      <transition name="md-mask-fade">
        <div
          v-show="hasMask && modelValue"
          ref="mask"
          class="md-popup-mask"
          @click="popupMaskClick"
        ></div>
      </transition>
      <!-- content -->
      <md-transition
        v-bind="$attrs"
        :name="currentTransition"
        @before-enter="beforePopupAppear"
        @before-leave="beforePopupLeave"
        @after-enter="popupAppear"
        @after-leave="popupLeave"
      >
        <div
          v-show="modelValue"
          ref="box"
          class="md-popup-box"
          :class="[currentTransition]"
        >
          <slot></slot>
        </div>
      </md-transition>
    </div>
  </teleport>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
import MdTransition from 'mand-mobile/transition'
import { UPDATE_MODEL_EVENT } from 'mand-mobile/utils'
import {
  usePop,
  popupProps,
  MASK_CLICK,
  HIDE,
  SHOW,
  BEFORE_SHOW,
  BEFORE_HIDE,
} from './use-popup'

export default defineComponent({
  name: 'MdPopup',
  components: {
    MdTransition,
  },
  inheritAttrs: false,
  props: popupProps,
  emits: [
    UPDATE_MODEL_EVENT,
    MASK_CLICK,
    SHOW,
    HIDE,
    BEFORE_SHOW,
    BEFORE_HIDE,
  ],
  setup(props, context) {
    const {
      isPopupShow,
      currentTransition,
      popupMaskClick,
      popupLeave,
      popupAppear,
      beforePopupAppear,
      beforePopupLeave,
      maskRef: mask,
      boxRef: box,
    } = usePop(props, context)

    return {
      isPopupShow,
      currentTransition,
      popupMaskClick,
      popupLeave,
      popupAppear,
      beforePopupAppear,
      beforePopupLeave,
      mask,
      box,
    }
  },
})
</script>

<style lang="stylus">
.md-popup
  absolute-pos()
  position fixed
  display flex
  pointer-events none
  z-index popup-zindex

  &.center
    align-items center
    justify-content center

  &.top
    flex-direction column
    justify-content flex-start
    .md-popup-box
      width 100%

  &.bottom
    flex-direction column
    justify-content flex-end
    .md-popup-box
      width 100%

  &.left
    justify-content flex-start
    .md-popup-box
      height 100%

  &.right
    justify-content flex-end
    .md-popup-box
      height 100%

  &.inner-popup .md-popup-box
    background-color color-bg-inverse
    border-radius popup-title-bar-radius popup-title-bar-radius 0 0
  &.large-radius.inner-popup .md-popup-box
    border-radius popup-title-bar-radius-large popup-title-bar-radius-large 0 0

.md-popup-mask
  absolute-pos()
  position absolute
  pointer-events auto
  z-index 1
  background-color popup-mask-bg

.md-popup-box
  position relative
  pointer-events auto
  z-index 2
  max-width 100%
  max-height 100%
  overflow auto

.md-popup-mask
  absolute-pos()
  position absolute
  pointer-events auto
  z-index 1
  background-color popup-mask-bg

.md-mask-fade
  &-enter-from, &-leave-to
    opacity 0.01
  &-enter-active, &-leave-active
    transition opacity .25s
</style>
