<template>
  <div
    class="md-field-item"
    :class="[
      solid ? 'md-field-item--solid' : '',
      currentDisabled ? 'md-field-item--disabled' : '',
      alignRight ? 'md-field-item--align-right' : '',
      isPadding ? 'md-field-item--padding' : '',
      highlight ? `md-field-item--highlight-${highlight}` : '',
      titlePosition ? `md-field-item--title-${titlePosition}` : '',
      inputEnv,
    ]"
    @click="$_onClick"
  >
    <div class="md-field-item_content" :class="customContentClass">
      <label class="md-field-item_content_title" v-if="title">{{title}}</label>
      <div class="md-field-item_content_left" v-if="hasSlotLeft">
        <slot name="left"/>
      </div>
      <div class="md-field-item_content_control">
        <slot>
          <template v-if="content">{{ content }}</template>
          <div class="md-field-item_content_placeholder" v-else-if="placeholder" v-text="placeholder"></div>
        </slot>
      </div>
      <div class="md-field-item_content_right" v-if="arrow || addon || $slots.right">
        <slot name="right">{{ addon }}</slot>
        <md-icon v-if="arrow" :name="arrow === true ? 'arrow-right' : arrow" size="md" />
      </div>
    </div>
    <div class="md-field-item_children" :class="customContentClass" v-if="$slots.children">
      <slot name="children"/>
    </div>
  </div>
</template>

<script>
import {isIOS, isAndroid} from '@mand-mobile/shared/lib/util/env'
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
    highlight: {
      type: String,
      default: '', // default, warning
    },
    isPadding: {
      type: Boolean,
      default: true,
    },
    titlePosition: {
      type: String,
      default: 'fixed', // floating, floating-active, fixed
    },
    customContentClass: {
      type: Array,
      default: () => [],
    },
    childrenSlots: {
      default: () => null,
    },
  },

  computed: {
    inputEnv() {
      /* istanbul ignore next */
      if (isIOS) {
        return 'md-field-item--ios'
      } else if (isAndroid) {
        return 'md-field-item--android'
      } else {
        return 'md-field-item--browser'
      }
    },
    currentDisabled() {
      return this.rootField.disabled || this.disabled
    },
    hasSlotLeft() {
      /**
      * There will be an extra layer of view in uniapp, which makes it impossible 
      * to obtain whether the subcomponent slot really contains content
      */
      if (this.childrenSlots) {
        return this.childrenSlots.left
      }
      return this.$slots.left
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

.md-field-item_content
  position relative
  display flex
  align-items center
  justify-content space-between
  min-height md-field-item-min-height
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
.md-field-item_content_title
  flex-shrink 0
  margin-right md-field-item-title-gap
  font-size md-field-item-font-size

.md-field-item_content_left
  flex-shrink 0
  display inline-flex
  align-items center
  justify-content flex-start
  margin-right md-h-gap-sm
  color md-field-item-addon-color
  font-size md-field-item-addon-font-size    

.md-field-item_content_control
  position relative
  flex 1 1 0%
  color md-field-item-color
  font-size md-field-item-font-size
  font-weight md-field-item-font-weight

.md-field-item_content_placeholder
  color md-field-item-placeholder-color
  font-weight md-font-weight-normal

.md-field-item_content_right
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

.md-field-item_children
  font-size md-field-item-children-font-size
  margin-top md-v-gap-md
  // &.has-children
  //   margin-top md-v-gap-md

.md-field-item
  &--solid
    .md-field-item_content_title
      width md-field-item-title-width
  &--disabled
    .md-field-item_content_control,
    .md-field-item_content_left,
    .md-field-item_content_right
      color md-color-text-disabled
  &--align-right
    .md-field-item_content_control
      text-align right
  &--android
    .md-field-item_content_control
      font-weight md-field-title-font-weight-android
  &--highlight-default
    .md-field-item_content
      hairline(bottom, md-field-item-color-highlight, 0, 4px)
  &--highlight-warning
    .md-field-item_content
      hairline(bottom, md-field-item-color-highlight-warning, 0, 4px)
  &--padding
    .md-field-item_content
      padding-top md-field-item-padding-v
      padding-bottom md-field-item-padding-v
  &--title-floating, &--title-floating-active
    .md-field-item_content_title
      position absolute
      top 50%
      left 0
      height auto
      font-size md-input-item-title-latent-font-size
      color md-input-item-title-latent-color
      transform translate3d(0, -50%, 0)
      transition all .3s ease
      opacity 0
      will-change auto
    .md-field-item_content
      min-height 115px
    .md-field-item_content,
    .md-field-item_content_left,
    .md-field-item_content_right,
    .md-input-item-input,
    .md-input-item-fake
      padding-top 20px
  &--title-floating-active
    .md-field-item_content_title
      opacity 1
      top 20px
      transform translate3d(0, 0, 0)
</style>
