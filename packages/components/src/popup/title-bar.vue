<template>
  <div
    class="md-popup-title-bar"
    :class="[
      `md-popup-title-bar--align-${titleAlign}`,
      {'md-popup-title-bar--large': !!describe},
    ]"
    @touchmove.prevent
  >
    <!-- Cancel -->
    <template v-if="!onlyClose">
      <div
        class="md-popup-title-bar_left md-popup-cancel"
        v-if="cancelText"
        v-html="cancelText"
        @click="$emit('cancel')"
      ></div>
      <div
        class="md-popup-title-bar_left md-popup-cancel"
        v-else-if="$slots.cancel"
        @click="$emit('cancel')"
      >
        <slot name="cancel"></slot>
      </div>
    </template>

    <!-- Title -->
    <div
      v-if="title"
      class="md-popup-title-bar_title"
    >
      <p
        v-if="title"
        class="md-popup-title-bar_title_main"
        v-html="title"
      ></p>
      <p
        v-if="describe"
        class="md-popup-title-bar_title_describe"
        v-html="describe"
      ></p>
    </div>
    <div
      class="md-popup-title-bar_title"
      v-else
    >
      <slot name="md-popup-title-bar_title_main"></slot>
    </div>

    <!-- Ok -->
    <template v-if="!onlyClose">
      <div
        class="md-popup-title-bar_right md-popup-confirm"
        v-if="okText"
        v-html="okText"
        @click="$emit('confirm')"
      ></div>
      <div
        class="md-popup-title-bar_right md-popup-confirm"
        v-else-if="$slots.confirm"
        @click="$emit('confirm')"
      >
        <slot name="confirm"></slot>
      </div>
    </template>
    <template v-if="onlyClose">
      <div
        class="md-popup-title-bar_right md-popup-close"
        @click="$emit('cancel')"
      >
        <md-icon name="close" size="lg"></md-icon>
      </div>
    </template>
  </div>
</template>

<script>// import titleBarMixin from './mixins/title-bar'
import Icon from '../icon'

export default {
  name: 'md-popup-title-bar',

  // mixins: [titleBarMixin],

  components: {
    'md-icon': Icon,
  },

  props: {
    // Mixin Props
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
      type: String,
      default: 'center',
    },
    onlyClose: {
      type: Boolean,
      default: false,
    },
  },

  watch: {
    largeRadius: {
      handler(val) {
        this.$parent.largeRadius = val
      },
      immediate: true,
    },
  },
}
</script>

<style lang="stylus" scoped>
.md-popup-title-bar
  position relative
  width 100%
  height md-popup-title-bar-height
  background-color md-popup-title-bar-bg
  border-radius md-popup-title-bar-radius md-popup-title-bar-radius 0 0
  clearfix()
  overflow hidden
  &.md-popup-title-bar--large
    height md-popup-title-bar-height-large
  &.md-popup-title-bar--align-left
    .md-popup-title-bar_title
      padding-left md-h-gap-sl
      align-items flex-start
    .md-popup-title-bar_left
      display none
  &.md-popup-title-bar--align-right
    .md-popup-title-bar_title
      padding-right md-h-gap-sl
      align-items flex-end
    .md-popup-title-bar_right
      display none
  &>div
    display flex
    float left
    height 100%
    padding-top 60px
    flex-direction column
    align-items center
    justify-content flex-start
    overflow hidden
    text-overflow ellipsis
    word-break break-word
    white-space nowrap
  .md-popup-title-bar_left, .md-popup-title-bar_right
    position absolute
    width 20%
    max-height md-popup-title-bar-height
    font-size md-popup-title-bar-font-size-button
    font-weight md-popup-title-bar-font-weight-button
    box-sizing border-box
    line-height 1
  .md-popup-title-bar_title
    width 100%
    padding-left 20%
    padding-right 20%
    box-sizing border-box
    line-height 1
    &_main
      font-size md-popup-title-bar-font-size-title
      color md-popup-title-bar-color-title
    &_describe
      margin-top 15px
      font-size md-popup-title-bar-font-size-describe
      color md-popup-title-bar-color-describe
  .md-popup-title-bar_left
    left 0
    padding-left md-h-gap-sl
    align-items flex-start
  .md-popup-title-bar_right
    right 0
    padding-right md-h-gap-sl
    align-items flex-end
  .md-popup-cancel
    color md-popup-title-bar-color-button-left
  .md-popup-confirm
    color md-popup-title-bar-color-button-right
  .md-popup-close
    padding-top md-h-gap-sl
    color md-popup-title-bar-color-button-left
    justify-content flex-start
</style>
