<template>
  <!-- eslint-disable vue/no-v-html -->
  <md-popup
    v-model="dialogShow"
    class="md-dialog"
    :has-mask="hasMask"
    :mask-closable="maskClosable"
    :transition="transition"
    :prevent-scroll="preventScroll"
    :prevent-scroll-exclude="preventScrollExclude"
    position="center"
    @show="onShow"
    @hide="onHide"
  >
    <!-- content area -->
    <div class="md-dialog-content">
      <slot name="header"></slot>
      <div class="md-dialog-body">
        <a
          v-if="closable"
          role="button"
          class="md-dialog-close"
          @click="close"
        >
          <md-icon name="close" />
        </a>
        <div v-if="icon" class="md-dialog-icon">
          <md-icon :name="icon" :svg="iconSvg" />
        </div>
        <div
          v-if="title"
          class="md-dialog-title"
          v-text="title"
        ></div>
        <!-- text or html content -->
        <slot>
          <div
            class="md-dialog-text"
            v-html="content"
          ></div>
        </slot>
      </div>

      <!-- buttons area -->
      <div
        v-if="actions.length > 0"
        class="md-dialog-actions"
        :class="{ 'is-column': layout === 'column' }"
      >
        <template
          v-for="(action, index) in actions"
          :key="index"
        >
          <a
            role="button"
            class="md-dialog-btn"
            :class="{
              disabled: !!action.disabled,
              warning: !action.disabled && !!action.warning,
            }"
            @touchmove.prevent
            @click="actionHandler(action)"
          >
            <md-activity-indicator-rolling
              v-if="action.loading"
              class="md-dialog-btn-loading"
            ></md-activity-indicator-rolling>
            <md-icon
              v-else-if="action.icon"
              class="md-dialog-btn-icon"
              :name="action.icon"
              :svg="action.iconSvg"
              size="md"
            ></md-icon>
            {{ action.text }}
          </a>
        </template>
      </div>
    </div>
  </md-popup>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import MdPopup from 'mand-mobile/popup'
import MdIcon from 'mand-mobile/icon'
import { ActivityIndicatorRolling as MdActivityIndicatorRolling } from 'mand-mobile/activity-indicator'
import {
  dialogProps as props,
  emits,
  useDialog,
} from './use-dialog'

export default defineComponent({
  name: 'MdDialog',
  components: {
    MdPopup,
    MdIcon,
    MdActivityIndicatorRolling,
  },
  props,
  emits,
  setup(props, context) {
    return {
      ...useDialog(props, context),
    }
  },
})
</script>

<style lang="stylus">
// .md-dialog
//   z-index dialog-zindex

.md-dialog-content
  width dialog-width
  border-radius dialog-radius
  background-color color-bg-inverse
  overflow hidden

.md-dialog-body
  color dialog-text-color
  font-size dialog-text-font-size
  text-align left
  padding dialog-body-padding

.md-dialog-icon
  position relative
  display block
  width dialog-icon-size
  height dialog-icon-size
  margin v-gap-md auto 28px
.md-dialog .md-dialog-icon .md-icon
.md-dialog .md-dialog-icon .md-icon.icon-svg
.md-dialog .md-dialog-icon .md-icon.icon-font
  display flex
  align-items center
  justify-content center
  position absolute
  top 0
  left 0
  width dialog-icon-size
  height dialog-icon-size
  fill dialog-icon-fill
  color dialog-icon-fill
  font-size dialog-icon-size
  line-height dialog-icon-size

.md-dialog-close
  position absolute
  color dialog-close-color
  top 32px
  right 32px
  z-index 15

.md-dialog-title
  color dialog-title-color
  text-align center
  font-size dialog-title-font-size
  font-weight font-weight-normal
  line-height 1.2
  margin 0 0 28px 0

.md-dialog-text
  display flex
  justify-content center

.md-dialog-actions
  position relative
  display flex
  hairline(top, dialog-action-border-color)
  &.is-column
    flex-direction column
    .md-dialog-btn
      flex 0 0 auto
      remove-hairline(right)
      &:not(:first-child)
        hairline(top, dialog-action-border-color)
      &:last-child
        color color-text-minor
      &:first-child
        color dialog-action-highlight-color

.md-dialog-btn
  position relative
  flex 1 1 0%
  display flex
  align-items center
  justify-content center
  height dialog-action-height
  font-size dialog-action-font-size
  font-weight dialog-action-font-weight
  color color-text-minor
  text-align center
  hairline(right, dialog-action-border-color)
  transition background-color .3s
  -webkit-user-select none
  -webkit-tap-highlight-color transparent
  &.warning
    color color-text-error !important
    .md-dialog-btn-loading .md-activity-indicator-svg .circle circle
      stroke color-text-error !important
  &.disabled
    color color-text-disabled !important
    .md-dialog-btn-loading .md-activity-indicator-svg .circle circle
      stroke color-text-disabled !important
  &:last-child
    color dialog-action-highlight-color
    remove-hairline(right)
    .md-dialog-btn-loading .md-activity-indicator-svg .circle circle
      stroke dialog-action-highlight-color
  &:not(.disabled):active
    background-color color-bg-tap
  .md-dialog-btn-loading .md-activity-indicator-svg
    width 32px !important
    height 32px !important
    margin-right 10px
    .circle circle
      stroke color-text-minor
  .md-dialog-btn-icon
    margin-right 10px
</style>
