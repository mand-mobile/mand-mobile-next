<template>
  <div
    class="md-check-base-box"
    :class="{
      'is-disabled': disabled,
      'is-checked': isChecked
    }"
  >
    <slot></slot>
    <md-tag
      class="md-tag" 
      v-if="isChecked"
      size="tiny"
      shape="quarter"
      type="fill"
    >
      <md-icon class="md-icon" name="right" size="sm"></md-icon>
    </md-tag>
  </div>
</template>

<script>
import Tag from '../tag'
import Icon from '../icon'
export default {
  name: 'md-check-base-box',

  components: {
    'md-tag': Tag,
    'md-icon': Icon,
  },

  props: {
    label: {
      type: String,
      default: '',
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    isChecked: {
      type: Boolean,
      default: false,
    },
  },
}

</script>

<style lang="stylus">
.md-check-base-box
  position relative
  display inline-block
  margin-right 8rpx
  text-align center
  color checkbox-color
  font-size checkbox-font-size
  padding v-gap-sm h-gap-md
  border 1px solid checkbox-border-color
  border-radius checkbox-border-radius
  box-sizing border-box
  overflow hidden
  &.is-checked
    color checkbox-active-color
    border-color checkbox-active-border-color
    &.is-disabled
      color checkbox-active-color
      border-color checkbox-active-border-color
      opacity 0.6
  &.is-disabled
    color checkbox-disabled-color
    border-color checkbox-disabled-color

  .md-tag
    position absolute
    top 0
    right 0
    font-size 0
</style>
