<template>
  <div
    class="md-radio-box"
    :class="{
      'is-disabled': disabled,
      'is-checked': isChecked,
    }"
    @click="clickHandler"
  >
    <slot>{{ label }}</slot>
    <md-icon
      v-if="isChecked"
      size="xs"
      name="right"
    ></md-icon>
  </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue'
import MdIcon from 'mand-mobile/icon'
import { UPDATE_MODEL_EVENT } from 'mand-mobile/utils'
import { radioProps, useRadio } from './use-radio'

export default defineComponent({
  name: 'MdRadioBox',
  components: { MdIcon },
  props: radioProps,
  emits: [UPDATE_MODEL_EVENT],
  setup: (props, context) => ({
    ...useRadio(props, context),
  }),
})
</script>

<style lang="stylus">
.md-radio-box
  position relative
  display inline-flex
  text-align center
  color checkbox-color
  font-size checkbox-font-size
  padding v-gap-sm h-gap-md
  border 1px solid checkbox-border-color
  border-radius checkbox-border-radius
  box-sizing border-box
  overflow hidden
  transition all .08s
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

  .md-icon
    position absolute
    top 0
    right -8px
    background-color checkbox-active-color
    border-bottom-left-radius 2000px
    color #fff
</style>
