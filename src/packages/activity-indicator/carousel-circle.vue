<template>
  <circle :cx="cx" :cy="size / 2" :r="size / 2">
    <!-- eslint-disable vue/attribute-hyphenation -->
    <animate
      :values="opacityValues"
      attributeName="fill-opacity"
      attributeType="XML"
      begin="0s"
      dur="1s"
      calcMode="linear"
      repeatCount="indefinite"
    />
    <animate
      :values="sizeValues"
      attributeName="r"
      attributeType="XML"
      begin="0s"
      dur="1s"
      calcMode="linear"
      repeatCount="indefinite"
    />
  </circle>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue'

export default defineComponent({
  name: 'MdActivityIndicatorCarouselCircle',
  props: {
    size: {
      type: Number,
      default: 30,
    },
    index: {
      type: Number,
      default: 0,
    },
    animateValues: {
      type: Array,
      default: () => [],
    },
  },
  setup(props) {
    const cx = computed(
      () => props.index * props.size * 1.5 + props.size / 2
    )
    const opacityValues = computed(() =>
      props.animateValues.join(';')
    )
    const sizeValues = computed(() =>
      props.animateValues
        .map((val: any) => (val * props.size) / 2)
        .join(';')
    )

    return {
      cx,
      opacityValues,
      sizeValues,
    }
  },
})
</script>
