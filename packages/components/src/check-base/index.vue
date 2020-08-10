<template>
  <div
    class="md-check-base-box"
    :class="{
      'md-check-base-box--is-disabled': disabled,
      'md-check-base-box--is-checked': isChecked
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
import Tag from 'mand-mobile/lib/tag'
import Icon from 'mand-mobile/lib/icon'
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
  margin-right 8px
  text-align center
  color md-checkbox-color
  font-size md-checkbox-font-size
  padding md-v-gap-sm md-h-gap-md
  border 1px solid md-checkbox-border-color
  border-radius md-checkbox-border-radius
  box-sizing border-box
  overflow hidden
  &--is-checked
    color md-checkbox-active-color
    border-color md-checkbox-active-border-color
    &--is-disabled
      color md-checkbox-active-color
      border-color md-checkbox-active-border-color
      opacity 0.6
  &--is-disabled
    color md-checkbox-disabled-color
    border-color md-checkbox-disabled-color

  .md-tag
    position absolute
    top 0
    right 0
    font-size 0
</style>
