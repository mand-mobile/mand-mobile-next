<template>
  <div
    class="md-popup-title-bar"
    :class="[`title-align-${titleAlign}`]"
  >
    <!-- Cancel -->
    <template v-if="!onlyClose">
      <!-- todo slot -->
      <div
        v-if="cancelText"
        class="title-bar-left md-popup-cancel"
        @click="$emit('cancel')"
        v-text="cancelText"
      ></div>
      <div
        v-else-if="$slots.cancel"
        class="title-bar-left md-popup-cancel"
        @click="$emit('cancel')"
      >
        <slot name="cancel"></slot>
      </div>
    </template>

    <!-- Title -->
    <div v-if="title" class="title-bar-title">
      <p v-if="title" class="title" v-text="title"></p>
      <!-- todo slot -->
      <p
        v-if="describe"
        class="describe"
        v-text="describe"
      ></p>
    </div>
    <div v-else class="title-bar-title">
      <slot name="title"></slot>
    </div>

    <!-- Ok -->
    <template v-if="!onlyClose">
      <!-- todo slot -->
      <div
        v-if="okText"
        class="title-bar-right md-popup-confirm"
        @click="$emit('confirm')"
        v-text="okText"
      ></div>
      <div
        v-else-if="$slots.confirm"
        class="title-bar-right md-popup-confirm"
        @click="$emit('confirm')"
      >
        <slot name="confirm"></slot>
      </div>
    </template>
    <template v-if="onlyClose">
      <div
        class="title-bar-right md-popup-close"
        @click="$emit('cancel')"
      >
        <md-icon name="close" size="lg"></md-icon>
      </div>
    </template>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
import MdIcon from 'mand-mobile-next/icon'

export default defineComponent({
  name: 'MdPopupTitleBar',
  components: {
    MdIcon,
  },
  props: {
    title: {
      type: String,
      default: '',
    },
    describe: {
      type: String,
      default: '',
    },
    okText: {
      type: String,
      default: '',
    },
    cancelText: {
      type: String,
      default: '',
    },
    titleAlign: {
      type: String as PropType<'center' | 'left' | 'right'>,
      default: 'center',
    },
    onlyClose: {
      type: Boolean,
      default: false,
    },
  },
  emits: ['cancel', 'confirm'],
})
</script>

<style lang="stylus">
@import './title-bar.styl'

.md-popup-title-bar
  position relative
  width 100%
  // height popup-title-bar-height
  background-color var(--md-popup-title-bar-bg)
  border-radius var(--md-popup-title-bar-radius) var(--md-popup-title-bar-radius) 0 0
  overflow hidden
  &.large
    height var(--md-popup-title-bar-height-large)
  &.title-align-left
    .title-bar-title
      padding-left var(--md-h-gap-sl)
      align-items flex-start
    .title-bar-left
      display none
  &.title-align-right
    .title-bar-title
      padding-right var(--md-h-gap-sl)
      align-items flex-end
    .title-bar-right
      display none
  &>div
    display flex
    // float left
    // height 100%
    padding-top 60px
    flex-direction column
    align-items center
    justify-content flex-start
    // overflow hidden
    text-overflow ellipsis
    word-break break-word
    white-space nowrap
  .title-bar-left, .title-bar-right
    position absolute
    top 0
    width 20%
    max-height var(--md-popup-title-bar-height)
    font-size var(--md-popup-title-bar-font-size-button)
    font-weight var(--md-popup-title-bar-font-weight-button)
    box-sizing border-box
    line-height 1
  .title-bar-title
    width 100%
    padding-left 20%
    padding-right 20%
    box-sizing border-box
    line-height 1
    p.title
      height 50px
      font-size var(--md-popup-title-bar-font-size-title)
      color var(--md-popup-title-bar-color-title)
    p.describe
      margin-top 15px
      font-size var(--md-popup-title-bar-font-size-describe)
      color var(--md-popup-title-bar-color-describe)
  .title-bar-left
    left 0
    padding-left var(--md-h-gap-sl)
    align-items flex-start
  .title-bar-right
    right 0
    padding-right var(--md-h-gap-sl)
    align-items flex-end
  .md-popup-cancel
    color var(--md-popup-title-bar-color-button-left)
  .md-popup-confirm
    color var(--md-popup-title-bar-color-button-right)
  .md-popup-close
    padding-top var(--md-h-gap-sl)
    color var(--md-popup-title-bar-color-button-left)
    justify-content flex-start
</style>
