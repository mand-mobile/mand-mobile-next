<template>
  <div
    class="md-field-item"
    :class="[
      solid ? 'is-solid' : '',
      currentDisabled ? 'is-disabled' : '',
      alignRight ? 'is-align-right' : '',
      inputEnv
    ]"
    @click="$_onClick"
  >
    <div class="md-field-item-content" :class="customContentClass">
      <label class="md-field-item-title" v-if="title" v-text="title"></label>
      <div class="md-field-item-left" v-if="$slots.left">
        <slot name="left"></slot>
      </div>
      <div class="md-field-item-control">
        <slot>
          <template v-if="content">{{ content }}</template>
          <div class="md-field-item-placeholder" v-else-if="placeholder" v-text="placeholder"></div>
        </slot>
      </div>
      <div class="md-field-item-right" v-if="arrow || addon || $slots.right">
        <slot name="right">{{ addon }}</slot>
        <md-icon v-if="arrow" :name="arrow === true ? 'arrow-right' : arrow" size="md" />
      </div>
    </div>
    <div class="md-field-item-children" :class="customContentClass" v-if="$slots.children">
      <slot name="children"></slot>
    </div>
  </div>
</template>

<script>import {isIOS, isAndroid} from '@mand-mobile/shared/lib/util'
import Icon from '../icon'

export default {
  name: 'md-field-item',

  components: {
    'md-icon': Icon,
  },

  inject: {
    rootField: {
      from: 'rootField',
      default() {
        /* istanbul ignore next */
        return {}
      },
    },
  },

  props: {
    title: {
      type: String,
      default: '',
    },
    placeholder: {
      type: String,
      default: '',
    },
    content: {
      type: String,
      default: '',
    },
    addon: {
      type: String,
      default: '',
    },
    arrow: {
      type: [Boolean, String],
      default: false,
    },
    solid: {
      type: Boolean,
      default: false,
    },
    alignRight: {
      type: Boolean,
      default: false,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    customContentClass: {
      type: Array,
      default: () => [],
    },
  },

  computed: {
    inputEnv() {
      /* istanbul ignore next */
      if (isIOS) {
        return 'is-ios'
      } else if (isAndroid) {
        return 'is-android'
      } else {
        return 'is-browser'
      }
    },
    currentDisabled() {
      return this.rootField.disabled || this.disabled
    },
  },

  methods: {
    $_onClick(e) {
      if (!this.currentDisabled) {
        this.$emit('click', e)
      }
    },
  },
}
</script>

<style lang="stylus">
.md-field-item
  position relative

.md-field-item-content
  position relative
  display flex
  align-items center
  justify-content space-between
  min-height md-field-item-min-height
  padding-top md-field-item-padding-v
  padding-bottom md-field-item-padding-v
  box-sizing border-box
  hairline(bottom, md-field-item-border-color)
  &.input-item-wrapper
    padding-top 0
    padding-bottom 0
  &.is-error
    hairline(bottom, md-input-item-color-error, 0, 4px)
  &.is-highlight
    &.is-focus
      hairline(bottom, md-input-item-color-highlight, 0, 4px)
.md-field-item-title
  flex-shrink 0
  margin-right md-field-item-title-gap
  font-size md-field-item-font-size

.md-field-item-left
  flex-shrink 0
  margin-right h-gap-sm
  display inline-flex
  align-items center
  justify-content flex-start
  color md-field-item-addon-color
  font-size md-field-item-addon-font-size

.md-field-item-control
  position relative
  flex 1 1 0%
  color md-field-item-color
  font-size md-field-item-font-size
  font-weight md-field-item-font-weight

.md-field-item-placeholder
  color md-field-item-placeholder-color
  font-weight md-font-weight-normal

.md-field-item-right
  position relative
  flex-shrink 0
  margin-left md-h-gap-sm
  display inline-flex
  align-items center
  justify-content flex-end
  color md-field-item-addon-color
  font-size md-field-item-addon-font-size
  .md-icon-arrow-right
    margin-right -6px
    color md-color-text-placeholder

.md-field-item-children
  font-size md-field-item-children-font-size
  margin-top md-v-gap-md
  &.has-children
    margin-top md-v-gap-md

.md-field-item
  &.is-solid
    .md-field-item-title
      width md-field-item-title-width
  &.is-disabled
    .md-field-item-control,
    .md-field-item-left,
    .md-field-item-right
      color md-color-text-disabled
  &.is-align-right
    .md-field-item-control
      text-align right
  &.is-android
    .md-field-item-control
      font-weight md-field-title-font-weight-android
</style>
