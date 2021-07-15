<template>
  <div
    ref="slider"
    role="slider"
    class="md-slider"
    :class="{ 'is-disabled': disabled }"
  >
    <div
      class="md-slider-bar"
      :style="{
        width: currentWidth + 'px',
        left: currentLeft + 'px',
      }"
    ></div>
    <slot
      name="dragger"
      :value="modelValue"
      :onTouchStart="dragStartHandler"
      :onTouchEnd="dragEndHandler"
      :refs="draggers"
      :isRange="isRange"
      :format="format"
    >
      <div
        v-for="item in isRange ? [0, 1] : [0]"
        :key="item"
        :ref="(el) => (draggers[item] = el)"
        class="md-slider-handle"
        :class="[item === 1 ? 'is-higher' : '']"
      >
        <md-tip
          :ref="item === 0 ? 'tip' : 'tipHigther'"
          name="slider-tip"
          :closable="false"
          :placement="tipPlacement"
          :content="
            Array.isArray(realValue)
              ? format(realValue[item].toString())
              : format(realValue.toString())
          "
        >
          <span
            @touchstart="dragStartHandler"
            @touchend="dragEndHandler"
          ></span>
        </md-tip>
      </div>
    </slot>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { UPDATE_MODEL_EVENT } from 'mand-mobile/utils'
import MdTip from 'mand-mobile/tip'
import {
  sliderProps as props,
  useSlider,
} from './user-slider'

export default defineComponent({
  name: 'MdSlider',
  components: {
    MdTip,
  },
  props,
  emits: [UPDATE_MODEL_EVENT],
  setup(props, context) {
    const {
      tipRef: tip,
      tipRefHigther: tipHigther,
      dragStartHandler,
      dragEndHandler,
      draggers,
      barRef: slider,
      position,
      currentWidth,
      currentLeft,
      realValue,
      isRange,
    } = useSlider(props, context)

    return {
      tip,
      tipHigther,
      dragStartHandler,
      dragEndHandler,
      draggers,
      slider,
      position,
      currentWidth,
      currentLeft,
      realValue,
      isRange,
    }
  },
})
</script>

<style lang="stylus">
@import './index.styl'

.md-slider
  position relative
  width 100%
  height 60px
  &::before
    content ''
    position absolute
    top 28px
    left 0
    right 0
    height 4px
    border-radius 2px
    background-color var(--md-slider-bg-base)
  &.is-disabled
    pointer-events none
    .md-slider-bar
      opacity 0.35
    .md-slider-handle span
      cursor: not-allowed

.md-slider-bar
  position absolute
  left 0
  top 28px
  height 4px
  background-color var(--md-slider-bg-tap)
  border-radius 2px
  z-index 5

.md-slider-handle
  position absolute
  top 10px
  left 0
  margin-left -20px
  z-index 15
  overflow visible
  // &::after
  //   content attr(data-hint)
  //   color tip-color
  //   position absolute
  //   pointer-events none
  //   opacity 0
  //   visibility hidden
  //   z-index 15
  //   font-size font-minor-normal
  //   line-height 1.25
  //   padding 8px 16px
  //   border-radius radius-normal
  //   background-color tip-fill
  //   white-space nowrap
  //   left 50%
  //   bottom 100%
  //   margin-bottom 20px
  //   transform translateX(-50%)

  &:hover::after,
  &:active::after
    opacity 1
    visibility visible

  &.is-higher
    z-index 20
  &.is-active span
    transform scale(1.3)
  span
    display block
    cursor pointer
    width 40px
    height 40px
    background-color var(--md-slider-handle-bg)
    border-radius 50%
    box-shadow 0 1px 2px rgba(0, 0, 0, 0.2)
    transition transform 200ms
.md-tip-content.slider-tip
  padding 8px 16px
  border-radius var(--md-radius-normal)
</style>
