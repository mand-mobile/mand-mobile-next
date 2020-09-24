<template>
  <div class="md-water-mark">
    <div class="md-water-mark_container">
      <slot></slot>
    </div>
    <div
      class="md-water-mark_list"
      ref="mark"
    >
      <div
        class="md-water-mark_list_wrapper"
        :style="{
           opacity,
           transform: `rotate(${rotate}deg)`,
           textAlign: 'center'
         }"
      > 
        <template v-if="content">
          <!-- web的水印等构建解决就把原来的复制过来 -->
         <canvas canvas-id="myCanvas" type="2d" id="myCanvas"></canvas>
        </template>
        <template v-else>
         <slot
           name="watermark"
         ></slot>
        </template>
      </div>
    </div>
  </div>
</template>

<script>
import {Dom} from '@mand-mobile/platform/lib/runtime/module'
import './common.styl'
const fontSize = 14
// const color = '#858B9C'

export default {
  name: 'md-water-mark',

  props: {
    content: {
      type: String,
      default: '',
    },
    spacing: {
      type: [String, Number],
      default: '20vw',
    },
    repeatX: {
      type: Boolean,
      default: true,
    },
    repeatY: {
      type: Boolean,
      default: true,
    },
    rotate: {
      type: [String, Number],
      default: -30,
    },
    opacity: {
      type: [String, Number],
      default: 0.1,
    },
  },

  data() {
    return {
      repetition: process.env.NODE_ENV === 'test' ? 2 : 50,
    }
  },

  async mounted() {
    if (this.content) {
      const $MDDom = Dom.bind(this)()
      const res = await $MDDom.querySelector('#myCanvas').getNode()
      // console.log(res);
      // uni h5端需要再查一次canvas, 因为uni把canvas编译成了 <uni-canvas><canvas/></uni-canvas>; 但如果是在web端使用, 不需要这句
      // const canvas = res.querySelector('canvas')
      const canvas = res
      const ctx = canvas.getContext('2d')
      this.ctx = ctx

      // this.$_initCanvas()
      this.$_computedSpacing()
      this.$_draw()
    }
  },

  methods: {
    // async $_initCanvas() {
    //   const {ctx, ratio, $refs} = this
    //   const {mark} = $refs
    // },

    $_computedSpacing() {
      const {spacing} = this

      if (typeof spacing === 'number') {
        this.realSpacing = spacing
        return
      }

      this.realSpacing = 30
    },

    $_draw() {
      const {content, ctx, realSpacing, rotate} = this
      const _fontSize = fontSize

      const contentLength = content.length * _fontSize
      const xCount = 10 //  Math.ceil(ctxWidth * ratio / (contentLength + realSpacing))
      const yCount = 10 //  Math.ceil(ctxHeight * ratio / (_fontSize + realSpacing))

      ctx.rotate(rotate * Math.PI / 180)
      ctx.font = `${_fontSize}px DIN Alternate, "Helvetica Neue",Helvetica,"PingFang SC","Hiragino Sans GB","Microsoft YaHei","微软雅黑",Arial,sans-serif`
      ctx.fillStyle = 'rgba(133,159,136, 0.1)'
      let ctxX = 0
      let ctxY = 0
      for (let y = 0; y < yCount; y++) {
        ctxX = 0
        for (let x = 0; x < xCount; x++) {
          console.log(content, ctxX, ctxY)
          ctx.fillText(content, ctxX, ctxY)
          ctxX += contentLength
        }
        ctxY += _fontSize + realSpacing
      }
      console.log(ctx)
    },
  },
}

</script>

