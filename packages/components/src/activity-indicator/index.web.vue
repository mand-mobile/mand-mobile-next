<template>
  <div
    class="md-activity-indicator"
    :class="type"
  >
    <div
      class="md-activity-indicator_container"
      :class="{'md-vertical' : vertical}"
    >
      <div class="indicator-loading">
        <template v-if="type === 'roller'">
          <md-activity-indicator-rolling
            :size="size"
            :color="color"
            :width="width"
          ></md-activity-indicator-rolling>
        </template>
        <!-- <template v-else-if="type === 'roller-success'">
          <md-activity-indicator-rolling-success
            :size="size"
            :color="color"
          ></md-activity-indicator-rolling-success>
        </template> -->
        <template v-else-if="type === 'spinner'">
          <md-activity-indicator-spinning
            :size="size"
            :color="color"
          ></md-activity-indicator-spinning>
        </template>
        <template v-else-if="type === 'carousel'">
          <md-activity-indicator-carousel
            :size="size"
            :color="color"
          ></md-activity-indicator-carousel>
        </template>
      </div>
      <div
        v-if="$slots.default"
        :style="{fontSize: `${textSize}px`, color: textColor}"
        class="md-activity-indicator_text"
      >
        <slot></slot>
      </div>
    </div>
  </div>
</template>

<script>
import Roller from './roller'
// import RollerSuccess from './roller-success'
import Spinner from './spinner'
import Carousel from './carousel'

export default {
  name: 'md-activity-indicator',

  components: {
    'md-activity-indicator-rolling': Roller,
    // [RollerSuccess.name]: RollerSuccess,
    'md-activity-indicator-spinning': Spinner,
    'md-activity-indicator-carousel': Carousel,
  },

  props: {
    type: {
      type: String,
      default: 'roller', // roller, spinner, carousel
    },
    size: {
      type: Number,
      default: 70,
    },
    width: {
      type: Number,
    },
    color: {
      type: String,
      default() {
        if (this.type === 'spinner') {
          return 'dark'
        } else {
          return '#2F86F6'
        }
      },
    },
    textColor: {
      type: String,
      default: '#999',
    },
    textSize: {
      type: Number,
    },
    vertical: {
      type: Boolean,
      default: false,
    },
  },
}

</script>

<style lang="stylus">
.md-activity-indicator
  &_container
    display flex
    flex-direction row
    align-items center
  &_text
    margin 0 0 0 15px
    color color-text-minor
  .md-vertical
    flex-direction column
    justify-content center
    .md-activity-indicator_text
      margin 15px 0 0 0
</style>
