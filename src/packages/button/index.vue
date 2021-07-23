<template>
  <button
    :type="nativeType"
    class="md-button"
    :class="[
      type,
      inactive ? 'inactive' : 'active',
      inline ? 'inline' : 'block',
      round ? 'round' : '',
      plain ? 'plain' : '',
      size === 'small' ? 'small' : '',
    ]"
    :disabled="inactive || type === 'disabled'"
  >
    <div class="md-button-inner">
      <template v-if="loading">
        <md-activity-indicator-rolling
          class="md-button-loading"
        ></md-activity-indicator-rolling>
      </template>
      <template v-else-if="icon">
        <md-icon :name="icon" :svg="iconSvg"></md-icon>
      </template>
      <div class="md-button-content">
        <slot></slot>
      </div>
    </div>
  </button>
</template>
<script lang="ts">
import { defineComponent, PropType } from 'vue'
import { ActivityIndicatorRolling } from 'mand-mobile-next/activity-indicator'
import Icon from 'mand-mobile-next/icon'

export default defineComponent({
  name: 'MdButton',
  components: {
    [ActivityIndicatorRolling.name]:
      ActivityIndicatorRolling,
    [Icon.name]: Icon,
  },
  props: {
    type: {
      type: String as PropType<
        | 'default'
        | 'primary'
        | 'warning'
        | 'disabled'
        | 'link'
      >,
      default: 'default', // default, primary, warning, disabled, link
    },
    nativeType: {
      type: String as PropType<
        'button' | 'submit' | 'reset' | undefined
      >,
      default: 'button',
    },
    icon: {
      type: String,
      default: '',
    },
    iconSvg: {
      type: Boolean,
      default: false,
    },
    size: {
      type: String as PropType<'largin' | 'small'>,
      default: 'large', // large, small
    },
    plain: {
      type: Boolean,
      default: false,
    },
    round: {
      type: Boolean,
      default: false,
    },
    inline: {
      type: Boolean,
      default: false,
    },
    inactive: {
      type: Boolean,
      default: false,
    },
    loading: {
      type: Boolean,
      default: false,
    },
  },
})
</script>

<style lang="stylus">
@import './index.styl'

.md-button
  position relative
  display block
  height var(--md-button-height)
  line-height var(--md-button-height)
  font-size var(--md-button-font-size)
  font-weight var(--md-button-font-weight)
  font-family font-family-normal
  text-align center
  border none
  border-radius var(--md-button-radius)
  box-sizing border-box
  outline none
  transition all .3s
  -webkit-appearance none
  -webkit-user-select none
  -webkit-tap-highlight-color transparent
  overflow visible

.md-button-inner
  display flex
  align-items center
  justify-content center
  width 100%
  height 100%
  overflow hidden
  text-overflow ellipsis
  word-break break-word
  white-space nowrap

.md-button-loading
  .md-activity-indicator-svg
    width 35px !important
    height 35px !important
    margin-right 10px

.md-button-content
  display flex
  align-items center
  padding 0 6px
  .md-icon
    padding 0

.md-button
  position relative
  .md-icon
    display flex
    align-items center
    justify-content center
    padding 0 6px
  // type
  &.default
    background var(--md-button-default-fill)
    color var(--md-button-default-color)
    hairline(all, var(--md-color-border-element), var(--md-button-radius), 3px)
    &.active:active
      background var(--md-button-default-active-fill)
    .md-button-loading .md-activity-indicator-svg .circle circle
      stroke var(--md-button-default-color) !important
  &.primary
    background var(--md-button-primary-fill)
    color var(--md-button-primary-color)
    hairline(all, var(--md-button-primary-fill), var(--md-button-radius), 3px)
    &.active:active
      background var(--md-button-primary-active-fill)
    .md-button-loading .md-activity-indicator-svg .circle circle
      stroke var(--md-button-primary-color) !important
  &.warning
    background var(--md-button-warning-fill)
    color var(--md-button-warning-color)
    hairline(all, var(--md-button-warning-fill), var(--md-button-radius), 3px)
    &.active:active
      background var(--md-button-warning-active-fill)
    .md-button-loading .md-activity-indicator-svg .circle circle
      stroke var(--md-button-warning-color) !important
  &.disabled
    background var(--md-button-disabled-fill)
    color var(--md-button-disabled-color)
    hairline(all, var(--md-button-disabled-fill), var(--md-button-radius), 3px)
    .md-button-loading .md-activity-indicator-svg .circle circle
      stroke var(--md-button-disabled-color) !important

  &.plain
    background transparent

    &.default
      color var(--md-button-default-plain-color)
      hairline(all, var(--md-color-border-element), var(--md-button-radius), 3px)
      &.active:active
        background var(--md-button-default-plain-active-fill)
      .md-button-loading .md-activity-indicator-svg .circle circle
        stroke var(--md-button-default-plain-color) !important
    &.primary
      color var(--md-button-primary-plain-color)
      hairline(all, var(--md-button-primary-fill), var(--md-button-radius), 3px)
      &.active:active
        background var(--md-button-primary-plain-active-fill)
      .md-button-loading .md-activity-indicator-svg .circle circle
        stroke var(--md-button-primary-plain-color) !important
    &.warning
      color var(--md-button-warning-plain-color)
      hairline(all, var(--md-button-warning-fill), var(--md-button-radius), 3px)
      &.active:active
        background var(--md-button-warning-plain-active-fill)
      .md-button-loading .md-activity-indicator-svg .circle circle
        stroke var(--md-button-warning-plain-color) !important
    &.disabled
      color var(--md-button-disabled-plain-color)
      hairline(all, var(--md-color-border-element), var(--md-button-radius), 3px)
      .md-button-loading .md-activity-indicator-svg .circle circle
        stroke var(--md-button-disabled-plain-color) !important

  &.round
    border-radius var(--md-button-height)
    &:after
      border-radius var(--md-button-height) !important

  &.inline
    display inline-flex
    padding 0 var(--md-h-gap-md)
  &.block
    width 100%

  &.small
    height var(--md-button-small-height)
    line-height var(--md-button-small-height)
    font-size var(--md-button-small-font-size)
    &.round
      border-radius var(--md-button-small-height)
      &:after
        border-radius var(--md-button-small-height)

  &.link
    display inline
    width auto
    height auto
    line-height normal
    font-size var(--md-button-small-font-size)
    font-weight font-weight-normal
    color var(--md-button-primary-fill)
    background transparent
    &.inactive
      color var(--md-color-text-disabled)
      opacity 1

  &.inactive
    opacity var(--md-opacity-disabled)
    &.disabled
      opacity 1
</style>
