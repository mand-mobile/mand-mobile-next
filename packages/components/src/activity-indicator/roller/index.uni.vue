<template>
  <div class="md-activity-indicator-rolling">
    <div class="md-activity-indicator-rolling_container">
      <img 
        class="md-activity-indicator-rolling_rolling"
        src="https://pt-starimg.didistatic.com/static/starimg/img/I4gkiiTYYm1610369771710.gif"
        :style="styles"
      >
    </div>
    <div class="md-activity-indicator-rolling_content" v-if="$slots.default">
      <slot></slot>
    </div>
  </div>
</template>

<script>
import {flatStyleObject} from '@mand-mobile/shared/lib/util'

export default {
  name: 'md-activity-indicator-rolling',

  props: {
    size: {
      type: Number,
      default: 70,
    },
    width: {
      type: Number,
    },
    color: {
      type: String,
      default: '#2F86F6',
    },
    borderColor: {
      type: String,
      default: 'rgba(0, 0, 0, .1)',
    },
    fill: {
      type: String,
      default: 'transparent',
    },
    linecap: {
      // butt | round | square | inherit
      type: String,
      default: 'round',
    },
    rotate: {
      type: Number,
      default: 0,
    },
    process: {
      // process control 0-1
      type: Number,
    },
  },
  computed: {
    styles() {
      return flatStyleObject({
        width: `${this.size}px`,
        height: `${this.size}px`,
      })
    },
  },
}

</script>

<style lang="stylus">
.md-activity-indicator-rolling
  clearfix()
  &_container
    position relative
    float left
  &_rolling
    display block
</style>