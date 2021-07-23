<template>
  <div class="md-toast" :class="[position]">
    <!-- eslint-disable vue/no-v-html -->
    <md-popup
      v-model="isPopupShow"
      :has-mask="hasMask"
      :mask-closable="false"
      :position="position"
      :append-to-body="false"
      @show="onShow"
      @hide="onHide"
    >
      <div v-if="$slots.default" class="md-toast-content">
        <slot></slot>
      </div>
      <div v-else class="md-toast-content">
        <md-icon
          v-if="icon"
          :name="icon"
          size="lg"
          :svg="iconSvg"
        />
        <div
          v-if="content"
          class="md-toast-text"
          v-html="content"
        ></div>
      </div>
    </md-popup>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
import Popup from 'mand-mobile-next/popup'
import Icon from 'mand-mobile-next/icon'
import { useToast } from './use-toast'

export default defineComponent({
  name: 'MdToast',
  components: {
    MdPopup: Popup,
    MdIcon: Icon,
  },
  props: {
    id: {
      type: String,
      default: '',
    },
    icon: {
      type: String,
      default: '',
    },
    iconSvg: {
      type: Boolean,
      default: false,
    },
    content: {
      type: [String, Number],
      default: '',
    },
    duration: {
      type: Number,
      default: 0,
    },
    position: {
      type: String as PropType<
        'center' | 'top' | 'bottom' | 'left' | 'right'
      >,
      default: 'center',
    },
    hasMask: {
      type: Boolean,
      default: false,
    },
  },
  setup(props, context) {
    const {
      onShow,
      onHide,
      show,
      hide,
      fire,
      isPopupShow,
    } = useToast(props, context)
    return {
      onShow,
      onHide,

      show,
      hide,

      fire,

      isPopupShow,
    }
  },
})
</script>

<style lang="stylus">
@import './index.styl'

.md-toast
  .md-popup
    z-index var(--md-toast-zindex)
  .md-icon
    flex-shrink 0
    color var(--md-toast-color)
  .md-icon + .md-toast-text
    margin-left var(--md-h-gap-xs)
  .md-popup
    .md-popup-box
      width 540px
      display flex
      justify-content center
    .md-popup-mask
      background transparent
  &.bottom
    .md-popup .md-popup-box
      position absolute
      bottom 50px
      left 50%
      transform translateX(-50%)
  &.top
    .md-popup .md-popup-box
      position absolute
      top 50px
      left 50%
      transform translateX(-50%)

.md-toast-content
  display inline-flex
  align-items center
  max-width 100%
  min-width 80px
  padding var(--md-toast-padding)
  border-radius var(--md-toast-radius)
  font-size var(--md-toast-font-size)
  text-align left
  line-height 1.42857142
  color var(--md-toast-color)
  background-color var(--md-toast-fill)
  box-sizing border-box
  overflow hidden

.md-toast-text
  white-space nowrap
  text-overflow ellipsis
  overflow hidden
</style>
