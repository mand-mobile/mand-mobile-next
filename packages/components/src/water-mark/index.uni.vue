<template>
  <div class="md-water-mark" :style="inlineStyles">
    <div class="md-water-mark_container">
      <slot></slot>
    </div>
    <div
      class="md-water-mark_list"
    >
      <div
        class="md-water-mark_list_wrapper"
        :style="{
           opacity,
           transform: useCanvas ? 'none' : `rotate(${rotate}deg)`
         }"
      > 
        <template v-if="useCanvas">
          <canvas
            id="md-water-mark"
            canvas-id="md-water-mark"
            class="md-water-mark_list_canvas--uni"
            type="2d"
          ></canvas>
        </template>
        <template v-else-if="!!$slots.watermark">
          <ul
            v-for="i in (repeatY ? repetition : 1)"
            class="md-water-mark_list_wrap_line"
            :style="{ marginBottom: spacing }"
            :key="`line-${i}`"
          >
            <li
              v-for="j in (repeatX ? repetition : 1)"
              class="water-mark_list_wrap_line_item"
              :style="i % 2 === 0 ? {
                marginLeft: repeatX ? spacing : 0,
              } : {
                marginRight: repeatX ? spacing : 0,
              }"
              :key="`item-${j}`"
            >
              <slot name="watermark" :coord="{row: i, col: j}"/>
            </li>
          </ul>
        </template>
      </div>
    </div>
  </div>
</template>

<script>
import {flatStyleObject} from '@mand-mobile/shared/lib/util'
import {Dom} from '@mand-mobile/platform-runtime/lib/module'
import commonMixin from './mixins'
import './common.styl'

export default {
  name: 'md-water-mark',

  mixins: [commonMixin],

  data() {
    return {
      repetition: process.env.NODE_ENV === 'test' ? 2 : 50,
    }
  },

  computed: {
    useCanvas() {
      return !!this.content
    },
    inlineStyles() {
      return flatStyleObject(this.styles)
    },
  },

  async mounted() {
    if (this.content) {
      await this.$_initCanvas()
      this.$_computedSpacing()
      this.$_draw()
    }
  },

  methods: {
    async $_initCanvas() {
      const $MDDom = Dom.bind(this)
      const wrapper = $MDDom().querySelector('#md-water-mark')
      const {width: clientWidth, height: clientHeight} = await wrapper.getBoundingClientRect()
      const canvas = await wrapper.getNode()
      const ctx = canvas.getContext('2d')
      const ratio = 1

      this.ctxWidth = canvas.width = clientWidth * ratio
      this.ctxHeight = canvas.height = clientHeight * ratio

      ctx.scale(1 / ratio, 1 / ratio)
      this.ctx = ctx
      this.ratio = ratio
    },

    $_computedSpacing() {
      const {spacing} = this

      if (typeof spacing === 'number') {
        this.realSpacing = spacing
        return
      }

      this.realSpacing = 30
    },

    $_draw() {
      const {content, ctx, realSpacing, ratio, rotate, opacity, color, fontSize, ctxWidth, ctxHeight} = this
      const contentLength = content.length * fontSize
      const xCount = Math.ceil(ctxWidth * ratio / (contentLength + realSpacing / ratio))
      const yCount = Math.ceil(ctxHeight * ratio / (fontSize + realSpacing / ratio))

      ctx.translate(ctxWidth / 2, ctxHeight / 2)
      ctx.rotate(rotate * Math.PI / 180)
      ctx.translate(-ctxWidth / 2, -ctxHeight / 2)

      ctx.font = `${fontSize}px "Helvetica Neue",Helvetica,"PingFang SC","Hiragino Sans GB","Microsoft YaHei","微软雅黑",Arial,sans-serif`
      ctx.fillStyle = color
      ctx.globalAlpha = opacity
      let ctxX = 0
      let ctxY = 0
      for (let y = 0; y < yCount; y++) {
        ctxX = 0
        for (let x = 0; x < xCount; x++) {
          ctx.fillText(content, ctxX, ctxY)
          ctxX += contentLength
        }
        ctxY += fontSize + realSpacing
      }
    },
  },
}

</script>

