<template>
  <button
    :type="nativeType"
    class="md-button"
    :class="[
      `md-button--${type}`,
      inactive ? 'md-button--inactive' : 'md-button--active',
      inline ? 'md-button--inline' : 'md-button--block',
      round ? 'md-button--round' : '',
      plain ? 'md-button--plain' : '',
      size === 'small' ? 'md-button--small' : '',
    ]"
    :disabled="inactive || type === 'disabled'"
    @click="clickHandler"
  >
    <div class="md-button_inner">
      <template v-if="loading">
        <!-- <md-activity-indicator-rolling class="md-button_loading"></md-activity-indicator-rolling> -->
      </template>
      <template v-else-if="icon">
        <md-icon :name="icon" :svg="iconSvg"></md-icon>
      </template>
      <p class="md-button_content">
        <slot></slot>
      </p>
    </div>
  </button>
</template>

<script>
import ActivityIndicatorRolling from '../activity-indicator/roller'
import Icon from '../icon'

console.info('called by specific platform web')

export default {
  name: 'md-button',

  components: {
    ActivityIndicatorRolling,
    'md-icon': Icon,
  },

  props: {
    type: {
      type: String,
      default: 'default', // default, primary, warning, disabled, link
    },
    nativeType: {
      type: String,
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
      type: String,
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
  methods: {
    clickHandler(e) {
      this.$emit('click', e)
    },
  },
}

</script>

<style lang="stylus">
.md-button
  position relative
  display block
  height md-button-height
  line-height md-button-height
  font-size md-button-font-size
  font-weight md-button-font-weight
  font-family md-font-family-normal
  text-align center
  border none
  border-radius md-button-radius
  box-sizing md-border-box
  outline none
  transition all .3s
  -webkit-appearance none
  -webkit-user-select none
  -webkit-tap-highlight-color transparent
  overflow visible

.md-button_inner
  display flex
  align-items center
  justify-content center
  width 100%
  height 100%
  overflow hidden
  text-overflow ellipsis
  word-break break-word
  white-space nowrap

.md-button_loading
  .md-activity-indicator_svg
    width 35px !important
    height 35px !important
    margin-right 10px

.md-button_content
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
  &.md-button--default
    background-color md-button-default-fill
    color md-button-default-color
    hairline(all, md-color-border-element, md-button-radius, 3px)
    &.md-button--active:active
      background-color md-button-default-active-fill
    .md-button_loading .md-activity-indicator_svg .md-circle circle
      stroke md-button-default-color !important
  &.md-button--primary
    background-color md-button-primary-fill
    color md-button-primary-color
    hairline(all, md-button-primary-fill, md-button-radius, 3px)
    &.md-button--active:active
      background-color md-button-primary-active-fill
    .md-button_loading .md-activity-indicator_svg .md-circle circle
      stroke md-button-primary-color !important
  &.md-button--warning
    background-color md-button-warning-fill
    color md-button-warning-color
    hairline(all, md-button-warning-fill, md-button-radius, 3px)
    &.md-button--active:active
      background-color md-button-warning-active-fill
    .md-button_loading .md-activity-indicator_svg .md-circle circle
      stroke md-button-warning-color !important
  &.md-button--disabled
    background-color md-button-disabled-fill
    color md-button-disabled-color
    hairline(all, md-button-disabled-fill, md-button-radius, 3px)
    .md-button_loading .md-activity-indicator_svg .md-circle circle
      stroke md-button-disabled-color !important

  &.md-button--plain
    background transparent

    &.md-button--default
      color md-button-default-plain-color
      hairline(all, md-color-border-element, md-button-radius, 3px)
      &.active:active
        background-color md-button-default-plain-active-fill
      .md-button_loading .md-activity-indicator_svg .md-circle circle
        stroke md-button-default-plain-color !important
    &.md-button--primary
      color md-button-primary-plain-color
      hairline(all, md-button-primary-fill, md-button-radius, 3px)
      &.md-button--active:active
        background-color md-button-primary-plain-active-fill
      .md-button_loading .md-activity-indicator_svg .md-circle circle
        stroke md-button-primary-plain-color !important
    &.md-button--warning
      color md-button-warning-plain-color
      hairline(all, md-button-warning-fill, md-button-radius, 3px)
      &.md-button--active:active
        background-color md-button-warning-plain-active-fill
      .md-button_loading .md-activity-indicator_svg .md-circle circle
        stroke md-button-warning-plain-color !important
    &.md-button--disabled
      color md-button-disabled-plain-color
      hairline(all, md-color-border-element, md-button-radius, 3px)
      .md-button_loading .md-activity-indicator_svg .md-circle circle
        stroke md-button-disabled-plain-color !important

  &.md-button--round
    border-radius md-button-height
    &:after
      border-radius md-button-height !important

  &.md-button--inline
    display inline-block
    padding 0 md-h-gap-md
  &.md-button--block
    width 100%

  &.md-button--small
    height md-button-small-height
    line-height md-button-small-height
    font-size md-button-small-font-size
    &.md-button--round
      border-radius md-button-small-height
      &:after
        border-radius md-button-small-height

  &.md-button--link
    display inline
    width auto
    height auto
    line-height 1
    font-size md-button-small-font-size
    font-weight md-font-weight-normal
    color md-button-primary-fill
    background transparent
    &.md-button--inactive
      color md-color-text-disabled
      opacity 1

  &.md-button--inactive
    opacity md-opacity-disabled
    &.md-button--disabled
      opacity 1
</style>
