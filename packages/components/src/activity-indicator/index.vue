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
            :color="colorCoerce"
            :width="width"
          />
        </template>
        <template v-else-if="type === 'spinner' || type === 'ring'">
          <md-activity-indicator-spinning
            :type="type"
            :size="size"
            :color="colorCoerce"
          />
        </template>
        <template v-else-if="type === 'carousel'">
          <md-activity-indicator-carousel
            :size="size"
            :color="colorCoerce"
          />
        </template>
      </div>
      <div
        v-if="$slots.default"
        class="md-activity-indicator_text"
        :style="{fontSize: `${textSize}px`, color: textColor}"
      >
        <slot/>
      </div>
    </div>
  </div>
</template>

<script>
import Roller from '../activity-indicator/roller'
import Spinner from '../activity-indicator/spinner'
import Carousel from '../activity-indicator/carousel'

export default {
  name: 'md-activity-indicator',

  components: {
    'md-activity-indicator-rolling': Roller,
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
      default: '',
    },
    textColor: {
      type: String,
      default: '#999',
    },
    textSize: {
      type: [Number, String],
      default: '16',
    },
    vertical: {
      type: Boolean,
      default: false,
    },
  },

  computed: {
    colorCoerce() {
      if (this.color) {
        return this.color
      }

      if (this.type === 'spinner') {
        return 'dark'
      } else {
        return '#2F86F6'
      }
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
    color md-color-text-minor
  .md-vertical
    flex-direction column
    justify-content center
    .md-activity-indicator_text
      margin 15px 0 0 0
</style>
