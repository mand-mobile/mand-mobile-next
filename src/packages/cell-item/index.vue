<template>
  <div
    class="md-cell-item"
    :class="{
      'is-disabled': disabled,
      'no-border': noBorder,
    }"
  >
    <div
      class="md-cell-item-body"
      :class="{ multilines: !!brief }"
    >
      <div v-if="$slots.left" class="md-cell-item-left">
        <slot name="left"></slot>
      </div>
      <div
        v-if="title || brief || !!$slots.default"
        class="md-cell-item-content"
      >
        <p v-if="title" class="md-cell-item-title">
          {{ title }}
        </p>
        <p v-if="brief" class="md-cell-item-brief">
          {{ brief }}
        </p>
        <slot></slot>
      </div>
      <div
        v-if="arrow || addon || !!$slots.right"
        class="md-cell-item-right"
      >
        <slot name="right">
          {{ addon }}
        </slot>
        <md-icon
          v-if="arrow"
          name="arrow-right"
          size="md"
        />
      </div>
    </div>
    <div
      v-if="!!$slots.children"
      class="md-cell-item-children"
    >
      <slot name="children"></slot>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import MdIcon from 'mand-mobile-next/icon'

export default defineComponent({
  name: 'MdCellItem',
  components: {
    MdIcon,
  },
  props: {
    title: {
      type: [String, Number],
      default: '',
    },
    brief: {
      type: [String, Number],
      default: '',
    },
    addon: {
      type: String,
      default: '',
    },
    arrow: {
      type: Boolean,
      default: false,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    noBorder: {
      type: Boolean,
      default: false,
    },
  },
})
</script>

<style lang="stylus">
@import './index.styl'

.md-cell-item
  position relative
  &.no-border .md-cell-item-body
    remove-hairline(bottom)


.md-cell-item-body
  position relative
  display flex
  align-items center
  justify-content space-between
  min-height var(--md-cell-item-min-height)
  padding-top var(--md-cell-item-padding-v)
  padding-bottom var(--md-cell-item-padding-v)
  box-sizing border-box
  hairline(bottom, var(--md-cell-item-border-color))
  &.multilines
    padding-top var(--md-cell-item-multilines-padding-v)
    padding-bottom var(--md-cell-item-multilines-padding-v)

.md-cell-item-left
  flex-shrink 0
  margin-right h-gap-lg

.md-cell-item-content
  flex 1 1 0%
  color var(--md-cell-item-title-color)
  font-size var(--md-cell-item-title-font-size)
  line-height 1.2

.md-cell-item-right
  flex-shrink 0
  margin-left h-gap-sm
  display inline-flex
  align-items center
  justify-content flex-end
  color var(--md-cell-item-right-color)
  font-size var(--md-cell-item-right-font-size)
  .md-icon-arrow-right
    margin-left 6px
    margin-right -6px
    color var(--md-color-text-placeholder)

.md-cell-item-title
  line-height 1.2

.md-cell-item-brief
  color var(--md-cell-item-brief-color)
  font-size var(--md-cell-item-brief-font-size)
  line-height 1.4
  margin-top v-gap-xs

.md-cell-item-children
  padding var(--md-cell-item-padding-v) 0

.md-cell-item
  &.is-disabled
    pointer-events none
    &,
    .md-cell-item-content,
    .md-cell-item-title,
    .md-cell-item-brief,
    .md-cell-item-left,
    .md-cell-item-right,
    .md-cell-item-children
      color var(--md-color-text-disabled)
</style>
