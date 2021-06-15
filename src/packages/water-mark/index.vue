<template>
  <div class="md-water-mark">
    <div class="water-mark-container">
      <slot></slot>
    </div>

    <div
      v-if="!!$slots.watermark || content"
      ref="mark"
      class="water-mark-list"
    >
      <div
        class="water-mark-list-wrapper"
        :style="{
          opacity,
          transform: `rotate(${rotate}deg)`,
        }"
      >
        <template v-if="content">
          <canvas
            ref="canvas"
            class="water-mark-canvas"
          ></canvas>
        </template>
        <template v-else-if="!!$slots.watermark">
          <ul
            v-for="i in repeatY ? 50 : 1"
            :key="`line-${i}`"
            class="water-mark-line"
            :style="{
              marginBottom: spacing,
            }"
          >
            <li
              v-for="j in repeatX ? 50 : 1"
              :key="`item-${j}`"
              class="water-mark-item"
              :style="
                i % 2 === 0
                  ? {
                      marginLeft: repeatX ? spacing : 0,
                    }
                  : {
                      marginRight: repeatX ? spacing : 0,
                    }
              "
            >
              <slot
                name="watermark"
                :coord="{ row: i, col: j }"
              ></slot>
            </li>
          </ul>
        </template>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import {
  waterMarkProps as props,
  useWaterMark,
} from './use-water-mark'

export default defineComponent({
  name: 'MdWaterMark',
  props,
  setup(props) {
    const { markRef: mark, canvasRef: canvas } =
      useWaterMark(props)
    return {
      mark,
      canvas,
    }
  },
})
</script>

<style lang="stylus">
.md-water-mark
  position relative
  overflow hidden

.water-mark-container
  position relative
  z-index 2

.water-mark-list
  clearfix()
  absolute-pos()
  position absolute
  filter grayscale(100%)
  display flex
  flex-direction column
  justify-content center
  overflow hidden

  .water-mark-canvas
    position absolute
    top 0
    left 0
    transform translate3d(-50%, -50%, 0)

.water-mark-line
  position relative
  left 50%
  float left
  width 10000%
  display flex
  justify-content center
  transform translateX(-50%)

.water-mark-item
  float left
  font-size font-body-large
  color color-text-caption
</style>
