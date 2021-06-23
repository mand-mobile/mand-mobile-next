<template>
  <label
    class="md-radio"
    :class="{
      'md-radio--is-disabled': disabled,
      'md-radio--is-checked': isChecked,
      'md-radio--is-inline': inline,
    }"
    @click="clickHandler"
  >
    <div class="md-radio_icon">
      <md-icon
        :name="currentIcon"
        :size="size"
        :svg="iconSvg"
      />
    </div>
    <div
      v-if="!!$slots.default || label"
      class="md-radio_label"
    >
      <slot>{{ label }}</slot>
    </div>
  </label>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import MdIcon from 'mand-mobile/icon'
import { UPDATE_MODEL_EVENT } from 'mand-mobile/utils'
import { radioProps, useRadio } from './use-radio'

export default defineComponent({
  name: 'MdRadio',
  components: {
    MdIcon,
  },
  props: radioProps,
  emits: [UPDATE_MODEL_EVENT],
  setup(props, context) {
    const { currentIcon, isChecked, clickHandler } =
      useRadio(props, context)

    return {
      currentIcon,
      isChecked,
      clickHandler,
    }
  },
})
</script>

<style lang="stylus">
.md-radio
  display flex
  align-items center
  line-height 1.5
  margin-top v-gap-sm
  margin-bottom v-gap-sm
  &_icon
    color color-text-placeholder
    .md-icon
      display flex
  &--is-checked
    .md-radio_icon
      color radio-color
  &--is-disabled
    pointer-events none
    .md-radio_icon
    .md-radio_label
      color color-text-disabled
  &--is-inline
    display inline-flex
    margin-right 30px

.md-radio_icon
  position relative
  flex-shrink 0

.md-radio_label
  margin-left h-gap-sm
  font-size inherit
  font-weight font-weight-normal
</style>
