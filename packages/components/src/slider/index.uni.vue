<template>
  <div
    class="md-slider"
    @mousemove="$_onDrag"
    @touchmove="$_onDrag"
    @mouseup="$_onUp"
    @touchend="$_onUp"
    :class="{ 'md-slider--is-disabled': disabled }"
  >
    <template v-if="range">
      <div
        class="md-slider_bar"
        :style="{ width: barStyle.width, left: barStyle.left }"
      ></div>
      <div
        class="md-slider_handle md-slider--is-lower"
        :data-hint="format(values[0])"
        :class="{
          'md-slider--is-active': isDragging && !isDragingUpper,
        }"
        :style="{ left: lowerHandlePosition + '%' }"
      >
        <div @mousedown="$_startLowerDrag" @touchstart="$_startLowerDrag"></div>
      </div>
      <div
        class="md-slider_handle md-slider--is-higher"
        :data-hint="format(values[1])"
        :class="{
          'md-slider--is-active': isDragging && isDragingUpper,
        }"
        :style="{ left: upperHandlePosition + '%' }"
      >
        <div @mousedown="$_startUpperDrag" @touchstart="$_startUpperDrag"></div>
      </div>
    </template>
    <template v-else>
      <div class="md-slider_bar" :style="{ width: barStyle.width }"></div>
      <div
        class="md-slider_handle"
        :data-hint="format(values[0])"
        :class="{
          'md-slider--is-active': isDragging,
        }"
        :style="{ left: lowerHandlePosition + '%' }"
      >
        <div @mousedown="$_startLowerDrag" @touchstart="$_startLowerDrag"></div>
      </div>
    </template>
  </div>
</template>

<script>
export default {
  name: 'md-slider',
  props: {
    value: {
      type: [Array, Number],
      default: 0,
    },
    min: {
      type: Number,
      default: 0,
    },
    max: {
      type: Number,
      default: 100,
    },
    step: {
      type: Number,
      default: 1,
    },
    range: {
      type: Boolean,
      default: false,
    },
    format: {
      type: Function,
      default(val) {
        return val => val
      },
    },
    disabled: {
      type: Boolean,
      default: false,
    },
  },

  data() {
    return {
      isDragging: false,
      isDragingUpper: false,
      values: [this.min, this.max],
      startDragMousePos: 0,
      startVal: 0,
      wrapWidth: uni.getSystemInfoSync().windowWidth,
    }
  },
  async mounted() {
    const {width} = await this.$MDDom()
      .querySelector('.md-slider')
      .getBoundingClientRect()
    this.wrapWidth = width
  },
  watch: {
    value: {
      immediate: true,
      handler(val) {
        if (
          (Array.isArray(val) && (val[0] !== this.values[0] || val[1] !== this.values[1])) ||
          val !== this.values[0]
        ) {
          this.$_updateValue(val)
        }
      },
    },
    disabled(newVal) {
      if (!newVal) {
        this.$_stopDrag()
      }
    },
  },

  computed: {
    lowerHandlePosition() {
      return (this.values[0] - this.min) / (this.max - this.min) * 100
    },
    upperHandlePosition() {
      return (this.values[1] - this.min) / (this.max - this.min) * 100
    },
    barStyle() {
      const {range, values, min, max, lowerHandlePosition} = this
      if (range) {
        return {
          width: (values[1] - values[0]) / (max - min) * 100 + '%',
          left: lowerHandlePosition + '%',
        }
      } else {
        return {
          width: (values[0] - min) / (max - min) * 100 + '%',
        }
      }
    },
  },

  methods: {
    $_updateValue(newVal) {
      let newValues = []

      if (Array.isArray(newVal)) {
        newValues = [newVal[0], newVal[1]]
      } else {
        newValues[0] = newVal
      }

      if (typeof newValues[0] !== 'number') {
        newValues[0] = this.values[0]
      } else {
        newValues[0] = Math.round((newValues[0] - this.min) / this.step) * this.step + this.min
      }

      if (typeof newValues[1] !== 'number') {
        newValues[1] = this.values[1]
      } else {
        newValues[1] = Math.round((newValues[1] - this.min) / this.step) * this.step + this.min
      }

      // value boundary adjust
      if (newValues[0] < this.min) {
        newValues[0] = this.min
      }
      if (newValues[1] > this.max) {
        newValues[1] = this.max
      }
      if (newValues[0] > newValues[1]) {
        if (newValues[0] === this.values[0]) {
          newValues[1] = newValues[0]
        } else {
          newValues[0] = newValues[1]
        }
      }

      if (this.values[0] === newValues[0] && this.values[1] === newValues[1]) {
        return
      }

      this.values = newValues

      if (this.range) {
        this.$emit('input', this.values)
      } else {
        this.$emit('input', this.values[0])
      }
    },
    $_startLowerDrag(e) {
      if (this.disabled) {
        return
      }
      e.preventDefault()
      e.stopPropagation()
      e = e.changedTouches ? e.changedTouches[0] : e
      this.startDragMousePos = e.pageX
      this.startVal = this.values[0]
      this.isDragingUpper = false
      this.isDragging = true
    },
    $_startUpperDrag(e) {
      if (this.disabled) {
        return
      }
      e.preventDefault()
      e.stopPropagation()
      e = e.changedTouches ? e.changedTouches[0] : e
      this.startDragMousePos = e.pageX
      this.startVal = this.values[1]
      this.isDragingUpper = true
      this.isDragging = true
    },
    $_onDrag(e) {
      if (this.disabled) {
        return
      }
      e.preventDefault()
      e.stopPropagation()
      if (!this.isDragging) {
        return
      }
      e = e.changedTouches ? e.changedTouches[0] : e
      global.requestAnimationFrame(() => {
        let diff = (e.pageX - this.startDragMousePos) / this.wrapWidth * (this.max - this.min)
        let nextVal = this.startVal + diff
        if (this.isDragging) {
          if (this.isDragingUpper) {
            this.$_updateValue([null, nextVal])
          } else {
            this.$_updateValue([nextVal, null])
          }
        }
      })
    },
    $_onUp(e) {
      e.preventDefault()
      e.stopPropagation()
      this.$_stopDrag()
    },
    $_stopDrag() {
      this.isDragging = false
      this.isDragingUpper = false
    },
  },
}

</script>

<style lang="stylus">
.md-slider
  position relative
  width 100%
  height 60px
  &::before
    content ''
    position absolute
    top 28px
    left 0
    right 0
    height 4px
    border-radius 2px
    background-color md-slider-bg-base
  &.md-slider--is-disabled
    .md-slider_bar
      opacity 0.35
    .md-slider_handle div
      cursor: not-allowed

.md-slider_bar
  position absolute
  left 0
  top 28px
  height 4px
  background-color md-slider-bg-tap
  border-radius 2px
  z-index 5

.md-slider_handle
  position absolute
  top 10px
  left 0
  margin-left -20px
  z-index 15
  overflow visible
  &::after
    content attr(data-hint)
    color md-tip-color
    position absolute
    pointer-events none
    opacity 0
    visibility hidden
    z-index 15
    font-size md-font-minor-normal
    line-height 1.25
    padding 8px 16px
    border-radius md-radius-normal
    background-color md-tip-fill
    white-space nowrap
    left 50%
    bottom 100%
    margin-bottom 20px
    transform translateX(-50%)

  &:hover::after,
  &:active::after
    opacity 1
    visibility visible

  &.md-slider--is-higher
    z-index 20
  &.md-slider--is-active div
    transform scale(1.3)
  div
    display block
    cursor pointer
    width 40px
    height 40px
    background-color md-slider-handle-bg
    border-radius 50%
    box-shadow 0 1px 2px rgba(0, 0, 0, 0.2)
    transition transform 200ms
</style>
