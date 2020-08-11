<template>
  <div class="md-cell-item"
    :class="{
      'md-cell-item--is-disabled': disabled,
      'md-cell-item--no-border': noBorder,
      'md-cell-item--active': active,
    }"
    @click="$_onClick"
  >
    <div
      class="md-cell-item_body"
      :class="{'md-cell-item_body--multilines': !!brief}"
    >
    <div class="md-cell-item_left" v-if="$slots.left">
      <slot name="left"></slot>
    </div>
    <div v-if="title || brief || $slots.default"
      class="md-cell-item_content"
      :class="{'md-cell-item_content--text-center': alignCenter}"
    >
      <p class="md-cell-item_title" v-if="title" v-text="title"></p>
      <p class="md-cell-item_brief" v-if="brief" v-text="brief"></p>
      <slot></slot>
    </div>
    <div class="md-cell-item_right" v-if="arrow || addon || $slots.right">
      <slot name="right">
        {{ addon }}
      </slot>
      <md-icon v-if="arrow" name="arrow-right" size="md" />
    </div>
    </div>
    <div class="md-cell-item_children"  v-if="$slots.children">
      <slot name="children"></slot>
    </div>
  </div>
</template>

<script>
import Icon from 'mand-mobile/lib/icon'

export default {
  name: 'md-cell-item',

  components: {
    'md-icon': Icon,
  },

  props: {
    position: {
      type: String,
      default: '',
    },
    title: {
      type: String,
      default: '',
    },
    brief: {
      type: String,
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
    active: {
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
    alignCenter: {
      type: Boolean,
      default: false,
    },
    // slotName: {
    //   type: String,
    //   default: 'sdsds', // default left right children
    // },
  },
  created() {},
  methods: {
    $_onClick(e) {
      if (!this.disabled) {
        this.$emit('click', e)
      }
    },
  },
}

</script>

<style lang="stylus">
.md-cell-item
  position relative
  &--no-border .md-cell-item_body
    remove-hairline(bottom)
  &--active
    .md-cell-item_title
      color md-cell-item-active-color

.md-cell-item_body
  position relative
  display flex
  align-items center
  justify-content space-between
  min-height md-cell-item-min-height
  padding-top md-cell-item-padding-v
  padding-bottom md-cell-item-padding-v
  box-sizing border-box
  hairline(bottom, md-cell-item-border-color)
  &--multilines
    padding-top md-cell-item-multilines-padding-v
    padding-bottom md-cell-item-multilines-padding-v

.md-cell-item_left
  flex-shrink 0
  margin-right md-h-gap-lg

.md-cell-item_content
  flex 1 1 0%
  color md-cell-item-title-color
  font-size md-cell-item-title-font-size
  line-height 1.2
  text-align left
  &--text-center
    text-align center

.md-cell-item_right
  // #ifdef MP-WEIXIN
  height 40rpx
  // #endif
  flex-shrink 0
  margin-left md-h-gap-sm
  display inline-flex
  align-items center
  justify-content flex-end
  color md-cell-item-right-color
  font-size md-cell-item-right-font-size
  .md-icon-arrow-right
    margin-left 6px
    margin-right -6px
    color md-color-text-placeholder

.md-cell-item_title
  line-height 1.2

.md-cell-item_brief
  color md-cell-item-brief-color
  font-size md-cell-item-brief-font-size
  line-height 1.4
  margin-top md-v-gap-xs

.md-cell-item_children
  padding md-cell-item-padding-v 0

.md-cell-item_children
  text-align left  

.md-cell-item
  &--is-disabled
    &,
    .md-cell-item_content,
    .md-cell-item_title,
    .md-cell-item_brief,
    .md-cell-item_left,
    .md-cell-item_right,
    .md-cell-item_children
      color md-color-text-disabled
</style>
