<template>
  <div
    class="md-ruler"
    @touchstart.prevent.stop="$_onDragStart"
    @touchmove.prevent.stop="$_onDrag"
    @touchend.prevent.stop="$_onDragEnd"
    @mousedown.prevent.stop="$_onDragStart"
    @mousemove.prevent.stop="$_onDrag"
    @mouseup.prevent.stop="$_onDragEnd"
    @mouseleave.prevent.stop="$_onDragEnd"
  >
    <canvas type="2d"
      id="md-ruler-canvas"
      ref="canvas"
      canvas-id="md-ruler-canvas"
      class="md-ruler-canvas"
    ></canvas>
    <div
      class="md-ruler-cursor"
      :class="[isStepTextBottom && 'md-ruler-cursor-bottom']"
    ></div>
    <div class="md-ruler-arrow"></div>
  </div>
</template>

<script>
import Scroller from '@mand-mobile/scroller'
import WheelScroller from '@mand-mobile/scroller/lib/wheel'
import {throttle, noop} from '@mand-mobile/shared/lib/util'
import {Dom, Device} from '@mand-mobile/platform-runtime/lib/module'

export default {
  name: 'md-ruler',

  props: {
    value: {
      type: Number,
      default: 0,
    },
    scope: {
      type: Array,
      default: () => [0, 100],
    },
    step: {
      type: Number,
      default: 10,
    },
    unit: {
      type: Number,
      default: 1,
    },
    min: {
      type: Number,
      default: 0,
    },
    max: {
      type: Number,
      default: 100,
    },
    scaleMarkSpacing: {
      type: Number,
      default: 30,
    },
    scaleMarkColor: {
      type: String,
      default: '#858B9C',
    },
    scaleTextColor: {
      type: String,
      default: '#C5CAD5',
    },
    scaleTextSize: {
      type: Number,
      default: 22,
    },
    scaleTextFont: {
      type: String,
      default: '"Helvetica Neue",Helvetica,"PingFang SC","Hiragino Sans GB","Microsoft YaHei","微软雅黑",Arial,sans-serif',
    },
    scaleTextPosition: {
      type: String,
      default: 'top',
      validator: val => !!~['top', 'bottom'].indexOf(val),
    },
    scaleTextRender: {
      type: Function,
      default: noop,
    },
    isVibrate: {
      type: Boolean,
      default: true,
    },
  },

  data() {
    return {
      clientWidth: 0,
      clientHeight: 60,
      scroller: null,
      ratio: 2,

      isInitialed: false,
      isDragging: false,
      isScrolling: false,

      x: 0,
      scrollingX: 0,
      // blank: 60, // unit blank
    }
  },

  computed: {
    unitCount() {
      const {scope: [min, max], unit} = this
      return Math.ceil((max - min) / unit)
    },

    canvasWidth() {
      return this.clientWidth * this.ratio
    },

    realMin() {
      const {scope, min} = this
      const [left, right] = scope
      if (min > right) {
        return left
      }
      return min > left ? min : left
    },

    realMax() {
      let {scope, max} = this
      const [left, right] = scope
      if (left > max) {
        return right
      }
      return max > right ? right : max
    },

    blankLeft() {
      const {scope, realMin, unit, scaleMarkSpacing} = this
      const [min] = scope
      return Math.ceil((realMin - min) / unit) * scaleMarkSpacing
    },

    blankRight() {
      const {scope, realMax, unit, scaleMarkSpacing} = this
      const [, max] = scope
      return Math.ceil((max - realMax) / unit) * scaleMarkSpacing
    },
    isStepTextBottom() {
      return this.scaleTextPosition === 'bottom'
    },
  },

  watch: {
    value() {
      if (this.isScrolling) {
        return
      }

      this.scrollingX = 0
      this.isScrolling = true
      const x = this.$_initX()
      this.$_draw(x)
      this.scroller.scrollTo(-x, 0, 300)
    },
  },

  mounted() {
    this.refresh()
  },

  methods: {
    // MARK: private methods
    async $_initCanvas() {
      let {ratio, clientHeight} = this

      const $MDDom = Dom.bind(this)
      const wrapper = $MDDom().querySelector('#md-ruler-canvas')
      const {width: clientWidth} = await wrapper.getBoundingClientRect()
      const canvas = await wrapper.getNode()
      const ctx = canvas.getContext('2d')

      canvas.width = clientWidth * ratio
      canvas.height = clientHeight * ratio

      ctx.scale(1 / ratio, 1)
      this.ctx = ctx

      this.clientWidth = clientWidth
      this.ratio = ratio
    },

    $_initScroller() {
      const {blankLeft, blankRight, scaleMarkSpacing, unitCount, canvasWidth, clientHeight} = this
      const drawFn = throttle(this.$_draw, 10)

      const scroller = new Scroller('', '', {
        scrollX: true,
        scrollY: false,
        swipeTime: 1500,
        probeType: 3,
      })
      // set real scroll width
      const innerWidth = unitCount * scaleMarkSpacing + canvasWidth - blankLeft - blankRight
      const x = this.$_initX()
      this.$_draw(x)

      scroller.setDimensions(
        {
          width: canvasWidth,
          height: clientHeight,
        },
        {
          width: innerWidth,
          height: clientHeight,
        },
      )

      const wheel = new WheelScroller(scroller, {
        itemHeight: scaleMarkSpacing,
      })

      scroller.on('scroll', point => {
        this.isInitialed && drawFn(-point.x)
      })
      scroller.on('scrollEnd', () => {
        this.isScrolling = false
      })
      scroller.scrollTo(-x, 0)

      this.scroller = scroller
      this.wheel = wheel
      this.isInitialed = true
    },

    $_initX() {
      const {value, scope, realMin, realMax, unit, scaleMarkSpacing, unitCount, canvasWidth} = this
      const [min] = scope

      this.x = canvasWidth - Math.ceil((realMin - min) / unit) * scaleMarkSpacing

      if (value <= realMin) {
        return 0
      } else if (value >= realMax) {
        return unitCount * scaleMarkSpacing
      } else {
        return Math.ceil((value - realMin) / unit) * scaleMarkSpacing
      }
    },

    $_draw(left) {
      left = +left.toFixed(2)
      const {ctx, ratio, scrollingX, canvasWidth, clientHeight} = this

      this.scrollingX = left
      this.x += scrollingX - left

      // clear canvas
      const scale = ratio * ratio
      ctx.clearRect(0, 0, canvasWidth * scale, clientHeight * scale)

      this.$_drawLine()
    },

    $_drawLine() {
      const {
        ctx,
        x,
        scope,
        step,
        unit,
        ratio,
        unitCount,
        scaleMarkSpacing,
        scaleMarkColor,
        scaleTextSize,
        scaleTextFont,
        scaleTextColor,
        isStepTextBottom,
      } = this
      const {blankLeft, blankRight, canvasWidth} = this
      const [scopeLeft] = scope

      const _fontSize = scaleTextSize
      const _y = 120 - (isStepTextBottom ? _fontSize + 40 : 0)
      const _stepUnit = Math.round(step / unit)

      ctx.lineWidth = 2
      ctx.font = `${_fontSize * ratio}px ${scaleTextFont}`

      for (let i = 0; i <= unitCount; i++) {
        const _x = x + i * scaleMarkSpacing

        if (_x < 0 || _x > canvasWidth * 2) {
          continue
        }

        // over range use another color
        const outRange = _x < x + blankLeft || _x > x + 1 + unitCount * scaleMarkSpacing - blankRight
        if (outRange) {
          ctx.fillStyle = '#E2E4EA'
          ctx.strokeStyle = '#E2E4EA'
        } else {
          ctx.fillStyle = scaleTextColor
          ctx.strokeStyle = scaleMarkColor
        }

        ctx.beginPath()
        ctx.moveTo(_x, _y)

        if (i % _stepUnit === 0) {
          // draw text
          const text = this.$_matchStepText(scopeLeft + unit * i)
          const textOffset = String(text).length * _fontSize / 2
          ctx.fillText(text, _x - textOffset, _fontSize * ratio + (isStepTextBottom ? 70 : 0))

          // draw line
          ctx.lineTo(_x, _y - 40)
        } else {
          ctx.lineTo(_x, _y - 20)
        }
        ctx.stroke()
      }

      // draw base line
      ctx.strokeStyle = '#E2E4EA'
      ctx.beginPath()
      ctx.moveTo(x, _y)
      ctx.lineTo(x + unitCount * scaleMarkSpacing, _y)
      ctx.stroke()

      this.$_updateValue()
    },

    $_matchStepText(step) {
      if (!this.scaleTextRender) {
        return step
      }
      const match = this.scaleTextRender(step)
      return match !== undefined && match !== null ? match : step
    },

    $_onDragStart(event) {
      if (this.isDragging || !this.scroller) {
        return
      }

      event.preventDefault()
      event.stopPropagation()
      this.scroller.handleStart(event)

      this.isDragging = true
      this.isScrolling = true
    },

    $_onDrag(event) {
      event.preventDefault()
      event.stopPropagation()
      this.scroller.handleMove(event)
    },

    $_onDragEnd(event) {
      event.preventDefault()
      event.stopPropagation()
      this.isDragging = false

      this.scroller.handleEnd(event)
    },

    $_updateValue() {
      if (!this.isInitialed) {
        return
      }

      const {x, scope: [min], realMin, realMax, unit, scaleMarkSpacing, canvasWidth} = this

      if (x > canvasWidth) {
        this.$_onInput(realMin)
        return
      }

      const _x = x >= 0 ? Math.abs(x - canvasWidth) : Math.abs(x) + canvasWidth
      let value = min + Math.round(_x / scaleMarkSpacing) * unit

      if (this.value === value) {
        return
      }

      value > realMax && (value = realMax)
      value < realMin && (value = realMin)
      this.$_onInput(value)

      this.isVibrate && Device().vibrate()
    },

    // MARK: events handler, 如 $_onButtonClick
    $_onInput(value) {
      this.$emit('input', value)
      this.$emit('change', value)
    },

    async refresh() {
      await this.$_initCanvas()
      this.$_initScroller()
    },
  },
}

</script>

<style lang="stylus">
.md-ruler
  position relative
  padding 36px 0 20px
  width 100%
  height 142px
  box-sizing border-box
  font-family md-font-family-number
  .md-ruler-canvas
    width 100%
    height 60px
  .md-ruler-cursor
    z-index 10
    position absolute
    top 26px
    left 50%
    width 2px
    height 70px
    transform translate(-50%)
    background-color md-color-primary
    box-shadow 0 2px 4px md-color-primary
    &-bottom
      height 40px
  .md-ruler-arrow
    z-index 10
    position absolute
    bottom 25px
    left 50%
    border-bottom 10px solid md-color-primary
    border-left 10px solid transparent
    border-right 10px solid transparent
    transform translate(-50%)
</style>
