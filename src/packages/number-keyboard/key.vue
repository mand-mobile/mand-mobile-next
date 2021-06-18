<template>
  <div
    class="md-number-key-item"
    :class="{ active: active }"
    @touchstart="onTouchStart"
    @touchmove="onTouchMove"
    @touchend="onTouchEnd"
    @touchcancel="onTouchEnd"
  >
    <slot></slot>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'

export default defineComponent({
  name: 'MdNumberKeyboardItem',
  props: {
    noTouch: {
      type: Boolean,
      default: true,
    },
  },
  emits: ['press'],
  setup(props, { emit }) {
    const active = ref(false)

    function onTouchStart(event: TouchEvent) {
      if (props.noTouch) active.value = true
    }

    function onTouchMove() {
      if (active.value) {
        active.value = false
      }
    }

    function onTouchEnd() {
      if (active.value) {
        active.value = false
        emit('press')
      }
    }

    return {
      onTouchStart,
      onTouchMove,
      onTouchEnd,
      active,
    }
  },
})
</script>

<style lang="stylus">
.md-number-key-item
  display flex
  justify-content center
  align-items center
  background number-keyboard-key-bg
  transition background .3s
  hairline(right, number-keyboard-key-border-color)
  hairline(top, number-keyboard-key-border-color)
</style>
