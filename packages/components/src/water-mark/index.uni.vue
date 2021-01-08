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
           transform: useCanvas ? 'none' : `rotate(${rotate}deg)`
         }"
      > 
        <template v-if="useCanvas">
          <canvas canvas-id="md-water-mark" type="2d" id="md-water-mark"></canvas>
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
import {Dom} from '@mand-mobile/platform-runtime/lib/module'
import commonMixin from './mixins'
import './common.styl'

export default {
  name: 'md-water-mark',

  mixins: [commonMixin],

  props: {
    color: {
      type: String,
      default: '133, 139, 156',
    },
  },

  data() {
    return {
      repetition: process.env.NODE_ENV === 'test' ? 2 : 50,
    }
  },

  computed: {
    useCanvas() {
      return !!this.content
    },
  },

  async mounted() {
    if (this.content) {
      const $MDDom = Dom.bind(this)
      const canvas = await $MDDom()
        .querySelector('#md-water-mark')
        .getNode()
      const ctx = canvas.getContext('2d')
      this.ctx = ctx

      this.$_computedSpacing()
      this.$_draw()
    }
  },

  methods: {
    $_computedSpacing() {
      const {spacing} = this

      if (typeof spacing === 'number') {
        this.realSpacing = spacing
        return
      }

      this.realSpacing = 30
    },

    $_draw() {
      const {content, ctx, realSpacing, rotate, opacity, color, fontSize} = this
      const contentLength = content.length * fontSize
      const xCount = 10 //  Math.ceil(ctxWidth * ratio / (contentLength + realSpacing))
      const yCount = 10 //  Math.ceil(ctxHeight * ratio / (_fontSize + realSpacing))

      ctx.rotate(rotate * Math.PI / 180)
      ctx.font = `${fontSize}px "Helvetica Neue",Helvetica,"PingFang SC","Hiragino Sans GB","Microsoft YaHei","微软雅黑",Arial,sans-serif`
      ctx.fillStyle = `rgba(${color}, ${opacity})`
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

