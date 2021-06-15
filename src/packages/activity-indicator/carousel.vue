<template>
  <div class="md-activity-indicator-carousel">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      :viewBox="viewBox"
      :fill="color"
      :style="{
        width: `${viewWidth}px`,
        height: `${size}px`,
      }"
      class="md-activity-indicator-svg carouseling"
    >
      <md-activity-indicator-carousel-circle
        v-for="(value, index) in circleAnimateValues"
        :key="`carousel-circle-${index}`"
        :size="size"
        :index="index"
        :animate-values="value"
      ></md-activity-indicator-carousel-circle>
    </svg>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed } from 'vue'
import CarouselCircle from './carousel-circle.vue'

export default defineComponent({
  name: 'MdActivityIndicatorCarousel',
  components: {
    [CarouselCircle.name]: CarouselCircle,
  },
  props: {
    size: {
      type: Number,
      default: 30,
    },
    color: {
      type: String,
      default: '#2F86F6',
    },
  },
  setup(props, context) {
    const circleAnimateValues = ref([
      [1, 0.8, 0.6, 0.6, 0.6, 0.8, 1],
      [0.6, 0.8, 1, 0.8, 0.6, 0.6, 0.6],
      [0.6, 0.6, 0.6, 0.8, 1, 0.8, 0.6],
    ])

    const viewWidth = computed(() => {
      const size = props.size
      const len = circleAnimateValues.value.length
      return len * size + ((len - 1) * size) / 2
    })
    const viewBox = computed(
      () => `0 0 ${viewWidth.value} ${props.size}`
    )

    return {
      circleAnimateValues,
      viewBox,
      viewWidth,
    }
  },
})
</script>

<style lang="stylus">
.md-activity-indicator-carousel
  clearfix()
  .carouseling
    float left
    overflow visible
</style>
