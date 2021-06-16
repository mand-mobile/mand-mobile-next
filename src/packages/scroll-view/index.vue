<template>
  <div class="md-scroll-view">
    <div v-if="$slots.header" class="scroll-view-header">
      <slot name="header"></slot>
    </div>

    <div ref="wrapper" class="scroll-view-container">
      <div class="scroll-view-content">
        <div
          v-if="pullDown"
          class="scroll-pulldown-wrapper"
        >
          <slot
            :beforePullDown="beforePullDown"
            :isPullingDown="isPullingDown"
            :canFreePullingDown="canFreePullingDown"
            :pullDownText="pullDownText"
            :pullDownPercent="pullDownPercent"
            name="pulldown"
          >
            <span>{{ pullDownText }}</span>
          </slot>
        </div>
        <!-- scroll content -->
        <slot></slot>
        <div v-if="pullUp" class="scroll-pullup-wrapper">
          <slot
            :isPullUpLoad="isPullUpLoad"
            :pullUpText="pullUpText"
            :isFinished="isFinished"
            name="pullup"
          >
            <span>{{ pullUpText }}</span>
          </slot>
        </div>
      </div>
    </div>

    <div v-if="$slots.footer" class="scroll-view-footer">
      <slot name="footer"></slot>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import {
  scrollProps as props,
  useScroll,
  PULLING_DOWN_EVNET,
  PULLING_UP_EVENT,
  SCROLL,
} from './use-scroll'

export default defineComponent({
  name: 'MdScrollView',
  props,
  emits: [PULLING_DOWN_EVNET, PULLING_UP_EVENT, SCROLL],
  setup(props, context) {
    const {
      wrapRef: wrapper,
      getScrollerInstance,
      resetScroller,
      finishPullDown,
      beforePullDown,
      isPullingDown,
      canFreePullingDown,
      pullDownText,
      pullDownPercent,
      finishPullUp,
      isPullUpLoad,
      pullUpText,
    } = useScroll(props, context)

    return {
      wrapper,
      getScrollerInstance,
      resetScroller,

      finishPullDown,
      beforePullDown,
      isPullingDown,
      canFreePullingDown,
      pullDownText,
      pullDownPercent,

      finishPullUp,
      isPullUpLoad,
      pullUpText,
    }
  },
})
</script>

<style lang="stylus">
// todo 区别不同样式
.md-scroll-view
  display flex
  flex-direction column
  .scroll-view-container
    position relative
    flex 1
    overflow hidden
  .scroll-pulldown-wrapper
    position absolute
    width 100%
    box-sizing border-box
    transform translateY(-100%) translateZ(0)
    text-align center
    color #999
  .scroll-pullup-wrapper
    font-size font-minor-large
    text-align center
    color color-text-caption
</style>
