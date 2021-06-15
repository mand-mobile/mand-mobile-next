<template>
  <div
    class="md-activity-indicator-spinning"
    :class="{ dark: color === 'dark' }"
  >
    <md-icon
      class="md-activity-indicator-svg"
      name="spinner"
      :style="{ width: `${size}px`, height: `${size}px` }"
    ></md-icon>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import Icon from 'mand-mobile/icon'

export default defineComponent({
  name: 'MdActivityIndicatorSpinning',
  components: {
    [Icon.name]: Icon,
  },
  props: {
    size: {
      type: Number,
      default: 70,
    },
    color: {
      type: String,
      default: 'dark',
      validator(val) {
        return val === 'dark' || val === 'light'
      },
    },
  },
})
</script>

<style lang="stylus">
.md-activity-indicator-spinning
  clearfix()
  .md-icon
    float left
  &.dark
    .md-icon
      filter invert(1)
</style>
