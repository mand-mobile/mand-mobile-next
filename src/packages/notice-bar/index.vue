<template>
  <div
    v-if="isShow"
    class="md-notice-bar"
    :class="[round && 'md-notice-bar-round', type]"
  >
    <div
      class="md-notice-bar-left"
      :class="[
        !customLeft && !icon && 'md-notice-bar-empty',
      ]"
    >
      <!-- custom first -->
      <slot v-if="customLeft" name="left"></slot>
      <md-icon
        v-else-if="icon"
        class="md-notice-icon"
        :name="icon"
        :svg="iconSvg"
      ></md-icon>
    </div>
    <div
      ref="wrap"
      class="md-notice-bar-content"
      :class="[multiRows && 'md-notice-bar-multi-content']"
    >
      <div
        ref="content"
        :class="[
          overflow &&
            scrollable &&
            'md-notice-bar-content-animate',
        ]"
      >
        <slot></slot>
      </div>
    </div>
    <div class="md-notice-bar-right">
      <!-- custom first -->
      <slot v-if="customRight" name="right"></slot>
      <md-icon
        v-else-if="mode || closable"
        class="md-notice-icon md-notice-icon-right"
        :name="rightIcon"
        @click="close"
      ></md-icon>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
import { Icon } from 'mand-mobile-next/icon'
import { useNotice } from './use-notice'

export default defineComponent({
  name: 'MdNoticeBar',
  components: {
    [Icon.name]: Icon,
  },
  props: {
    mode: {
      type: String as PropType<'closable' | 'link'>,
      default: '',
    },
    type: {
      type: String as PropType<
        'default' | 'activity' | 'warning'
      >,
      default: 'default',
    },
    time: {
      type: Number,
      default: 0,
    },
    round: {
      type: Boolean,
      default: false,
    },
    multiRows: {
      type: Boolean,
      default: false,
    },
    scrollable: {
      type: Boolean,
      default: false,
    },
    icon: {
      type: String,
      default: '',
    },
    iconSvg: {
      type: Boolean,
      default: false,
    },
    closable: {
      type: Boolean,
      default: false,
    },
  },
  emits: ['close'],
  setup(props, context) {
    return {
      ...useNotice(props, context),
    }
  },
})
</script>

<style lang="stylus">
@import './index.styl'

.md-notice-bar
  display flex
  z-index var(--md-notice-bar-zindex)
  font-size var(--md-notice-bar-font-size)
  min-height 64px
  background-color var(--md-notice-bar-fill)
  color var(--md-notice-bar-color)
  position relative
  padding-left 32px
  box-sizing border-box
  &.md-notice-bar-round
    border-radius var(--md-notice-bar-border-radius)
  &.activity
    background-color var(--md-notice-bar-fill-activity)
    color var(--md-notice-bar-color-activity)
  &.warning
    background-color var(--md-notice-bar-fill-warning)
    color var(--md-notice-bar-color-warning)

.md-notice-bar-left,
.md-notice-bar-right
  display flex
  align-items center

.md-notice-bar-left
  padding-right 12px
.md-notice-bar-right
  padding-right 32px
.md-notice-bar-empty
  padding-right 0

.md-notice-bar-content
  flex 1
  margin auto
  width auto
  line-height 64px
  white-space nowrap
  overflow hidden
  &.md-notice-bar-multi-content
    padding var(--md-h-gap-md) 0
    line-height var(--md-font-caption-large)
    white-space normal
  .md-notice-bar-content-animate
    padding-left 100%
    display inline-flex
    animation md-notice-bar-animation linear 16s infinite both

@keyframes md-notice-bar-animation {
  0% {
    transform translate3d(0, 0, 0)
  }
  100% {
    transform translate3d(-100%, 0, 0)
  }
}
</style>
