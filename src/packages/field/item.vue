<template>
  <div
    class="md-field-item"
    :class="[
      solid ? 'is-solid' : '',
      currentDisabled ? 'is-disabled' : '',
      alignRight ? 'is-align-right' : '',
      inputEnv,
    ]"
  >
    <div class="md-field-item-content">
      <label
        v-if="title"
        class="md-field-item-title"
        v-text="title"
      ></label>
      <div v-if="$slots.left" class="md-field-item-left">
        <slot name="left"></slot>
      </div>
      <div class="md-field-item-control">
        <slot>
          <template v-if="content">{{ content }}</template>
          <div
            v-else-if="placeholder"
            class="md-field-item-placeholder"
            v-text="placeholder"
          ></div>
        </slot>
      </div>
      <div
        v-if="arrow || addon || $slots.right"
        class="md-field-item-right"
      >
        <slot name="right">{{ addon }}</slot>
        <md-icon
          v-if="arrow"
          :name="arrow === true ? 'arrow-right' : arrow"
          size="md"
        />
      </div>
    </div>
    <div
      v-if="$slots.children"
      class="md-field-item-children"
    >
      <slot name="children"></slot>
    </div>
  </div>
</template>

<script lang="ts">
import {
  computed,
  defineComponent,
  inject,
  PropType,
} from 'vue'
import MdIcon from 'mand-mobile/icon'
import { isIOS, isAndroid } from 'mand-mobile/utils'

export default defineComponent({
  name: 'MdFieldItem',
  components: {
    MdIcon,
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
      type: String as PropType<
        'floating' | 'floating-active' | 'fixed'
      >,
      default: 'fixed', // floating, floating-active, fixed
    },
    customContentClass: {
      type: Array as PropType<'string'[]>,
      default: () => [],
    },
    // childrenSlots: {
    //   default: () => null,
    // },
  },
  setup(props, context) {
    const rootField = inject<{ disabled: boolean }>(
      'rootField',
      {} as any
    )

    const inputEnv = computed(() => {
      if (isIOS) {
        return 'is-ios'
      } else if (isAndroid) {
        return 'is-android'
      } else {
        return 'is-browser'
      }
    })

    const currentDisabled = computed(
      () => rootField.disabled || props.disabled
    )

    return { inputEnv, currentDisabled }
  },
})
</script>

<style lang="stylus">
@import './item.styl'

.md-field-item
  position relative

.md-field-item-content
  position relative
  display flex
  align-items center
  justify-content space-between
  min-height var(--md-field-item-min-height)
  padding-top var(--md-field-item-padding-v)
  padding-bottom var(--md-field-item-padding-v)
  box-sizing border-box
  hairline(bottom, var(--md-field-item-border-color))

.md-field-item-title
  flex-shrink 0
  margin-right var(--md-field-item-title-gap)
  font-size var(--md-field-item-font-size)

.md-field-item-left
  flex-shrink 0
  margin-right var(--md-h-gap-sm)
  display inline-flex
  align-items center
  justify-content flex-start
  color var(--md-field-item-addon-color)
  font-size var(--md-field-item-addon-font-size)

.md-field-item-control
  position relative
  flex 1 1 0%
  color var(--md-field-item-color)
  font-size var(--md-field-item-font-size)
  font-weight field-item-font-weight

.md-field-item-placeholder
  color var(--md-field-item-placeholder-color)
  font-weight var(--md-font-weight-normal)

.md-field-item-right
  position relative
  flex-shrink 0
  margin-left var(--md-h-gap-sm)
  display inline-flex
  align-items center
  justify-content flex-end
  color var(--md-field-item-addon-color)
  font-size var(--md-field-item-addon-font-size)
  .md-icon-arrow-right
    margin-right -6px
    color var(--md-color-text-placeholder)

.md-field-item-children
  font-size var(--md-field-item-children-font-size)
  margin-top var(--md-v-gap-md)

.md-field-item
  &.is-solid
    .md-field-item-title
      width var(--md-field-item-title-width)
  &.is-disabled
    .md-field-item-control,
    .md-field-item-left,
    .md-field-item-right
      color var(--md-color-text-disabled)
  &.is-align-right
    .md-field-item-control
      text-align right
  &.is-android
    .md-field-item-control
      font-weight var(--md-field-title-font-weight-android)
</style>
