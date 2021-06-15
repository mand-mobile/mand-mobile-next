<template>
  <label
    class="md-check"
    :class="{
      'is-disabled': disabled,
      'is-checked': isChecked,
    }"
    @click="clickHandler"
  >
    <div class="md-check-icon">
      <md-icon
        :name="currentIcon"
        :size="size"
        :svg="iconSvg"
      />
    </div>
    <div
      v-if="$slots.default || label"
      class="md-check-label"
    >
      <slot>{{ label }}</slot>
    </div>
  </label>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import MdIcon from 'mand-mobile/icon'
import { UPDATE_MODEL_EVENT } from 'mand-mobile/utils'
import { checkProps, useCheck } from './use-check'

export default defineComponent({
  name: 'MdCheck',
  components: {
    MdIcon,
  },
  props: checkProps,
  emits: [UPDATE_MODEL_EVENT],
  setup(props) {
    const { isChecked, currentIcon, clickHandler } =
      useCheck(props)

    return { isChecked, currentIcon, clickHandler }
  },
})
</script>

<style lang="stylus">
.md-check
  display flex
  align-items center
  margin-top v-gap-sm
  margin-bottom v-gap-sm
  &.is-checked
    .md-check-icon
      color check-color
  &.is-disabled
    .md-check-icon
    .md-check-label
      color color-text-disabled

.md-check-icon
  position relative
  color color-text-placeholder
  .md-icon
    display flex
    transition all .04s

.md-check-label
  margin-left h-gap-sm
  font-size inherit
</style>
