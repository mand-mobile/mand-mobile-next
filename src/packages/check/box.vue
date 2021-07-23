<template>
  <div
    class="md-check-box"
    :class="{
      'is-disabled': disabled,
      'is-checked': isChecked,
    }"
    @click="clickHandler"
  >
    <slot>{{ label }}</slot>
    <md-icon v-if="isChecked" size="xs" name="right" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import MdIcon from 'mand-mobile-next/icon'
import { UPDATE_MODEL_EVENT } from 'mand-mobile-next/utils'
import { checkProps, useCheck } from './use-check'

export default defineComponent({
  name: 'MdCheckBox',
  components: { MdIcon },
  props: checkProps,
  emits: [UPDATE_MODEL_EVENT],
  setup: (props, context) => ({
    ...useCheck(props, context),
  }),
})
</script>

<style lang="stylus">
@import './index.styl'

.md-check-box
  position relative
  display inline-flex
  text-align center
  color var(--md-checkbox-color)
  font-size var(--md-checkbox-font-size)
  padding var(--md-v-gap-sm) var(--md-h-gap-md)
  border 1px solid var(--md-checkbox-border-color)
  border-radius var(--md-checkbox-border-radius)
  box-sizing border-box
  overflow hidden
  transition all .08s
  &.is-checked
    color var(--md-checkbox-active-color)
    border-color var(--md-checkbox-active-border-color)
    &.is-disabled
      color var(--md-checkbox-active-color)
      border-color var(--md-checkbox-active-border-color)
      opacity 0.6
  &.is-disabled
    color var(--md-checkbox-disabled-color)
    border-color var(--md-checkbox-disabled-color)

  .md-icon
    position absolute
    top 0
    right -8px
    background-color var(--md-checkbox-active-color)
    border-bottom-left-radius 2000px
    color #fff
</style>
