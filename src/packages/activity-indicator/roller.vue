<template>
  <div class="md-activity-indicator-rolling">
    <div class="rolling-container">
      <svg
        :viewBox="`0 0 ${viewBoxSize} ${viewBoxSize}`"
        :style="{
          width: `${size}px`,
          height: `${size}px`,
          transform: `rotateZ(${rotate}deg)`,
        }"
        preserveAspectRatio="xMidYMid"
        class="md-activity-indicator-svg rolling"
      >
        <circle
          fill="none"
          :stroke="borderColor"
          :stroke-width="strokeWidth"
          :cx="viewBoxSize / 2"
          :cy="viewBoxSize / 2"
          :r="radius"
        />
        <g v-if="!$slots.circle" class="circle">
          <circle
            v-if="isAutoAnimation || process > 0"
            class="stroke"
            :cx="viewBoxSize / 2"
            :cy="viewBoxSize / 2"
            :fill="fill"
            :stroke="color"
            :stroke-width="strokeWidth"
            :stroke-dasharray="
              isAutoAnimation
                ? `${(110 * circlePerimeter) / 125}`
                : strokeDasharray
            "
            :stroke-linecap="linecap"
            :r="radius"
          >
            <animate
              v-if="isAutoAnimation"
              attributeName="stroke-dashoffset"
              :values="`${(360 * circlePerimeter) / 125};${
                (140 * circlePerimeter) / 125
              }`"
              dur="2.2s"
              keyTimes="0;1"
              calcMode="spline"
              fill="freeze"
              keySplines="0.41,0.314,0.8,0.54"
              repeatCount="indefinite"
              begin="0"
            />
            <animateTransform
              v-if="isAutoAnimation"
              :dur="`${duration}s`"
              :values="`0 ${viewBoxSize / 2} ${
                viewBoxSize / 2
              };360 ${viewBoxSize / 2} ${viewBoxSize / 2}`"
              attributeName="transform"
              type="rotate"
              calcMode="linear"
              keyTimes="0;1"
              begin="0"
              repeatCount="indefinite"
            ></animateTransform>
          </circle>
        </g>
        <slot v-else name="circle"></slot>
        <slot name="defs"></slot>
      </svg>
      <div class="content"><slot></slot></div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, ref } from 'vue'
import type { PropType } from 'vue'

const MdRoller = defineComponent({
  name: 'MdActivityIndicatorRolling',
  props: {
    size: {
      type: Number,
      default: 70,
    },
    width: {
      type: Number,
      default: undefined,
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
      type: String as PropType<
        'butt' | 'round' | 'square' | 'inherit'
      >,
      default: 'round',
    },
    rotate: {
      type: Number,
      default: 0,
    },
    process: {
      // process control 0-1
      type: Number,
      default: undefined,
    },
  },
  setup(props, context) {
    const id = computed(
      () =>
        `md-activity-indicator-rolling-keyframes-${props.size}`
    )
    const strokeWidth = computed<number>(
      () => props.width || props.size / 12
    )
    const circlePerimeter = computed(
      () => props.size * 3.1415
    )
    const strokeDasharray = computed(() => {
      if (!props.process) {
        return ''
      }
      return `${props.process * circlePerimeter.value} ${
        (1 - props.process) * circlePerimeter.value
      }`
    })
    const radius = computed(() => props.size / 2)
    const viewBoxSize = computed(
      () => props.size + 2 * strokeWidth.value
    )
    const duration = ref(2)
    const isAutoAnimation = computed(
      () => props.process === undefined
    )

    return {
      id,
      strokeWidth,
      circlePerimeter,
      strokeDasharray,
      radius,
      viewBoxSize,
      duration,
      isAutoAnimation,
    }
  },
})
export default MdRoller
</script>

<style lang="stylus">
.md-activity-indicator-rolling
  clearfix()
  .rolling-container
    position relative
    float left
  .rolling
    float left
    circle.stroke
      will-change auto
  .content
    position absolute
    absolute-pos()
    display flex
    justify-content center
    align-items center
</style>
