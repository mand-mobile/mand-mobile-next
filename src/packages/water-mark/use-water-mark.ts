import { computed, onMounted, ref } from 'vue'
import { getDpr } from 'mand-mobile-next/utils'
import type { ExtractPropTypes } from 'vue'

const FONT_SIZE = 14
const FILL_COLOR = '#858B9C'

export const waterMarkProps = {
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
}

export const useWaterMark = (
  props: ExtractPropTypes<typeof waterMarkProps>
) => {
  const markRef = ref<HTMLElement | null>(null)
  const canvasRef = ref<HTMLCanvasElement | null>(null)

  const canvasCtx = computed(() => {
    if (!canvasRef.value) return null
    return canvasRef.value.getContext('2d')
  })
  let canvasHeight = 0
  let canvasWidth = 0

  let ratio = 2
  let realSpacing = 0

  const initCanvas = () => {
    if (markRef.value && canvasRef.value) {
      const { clientHeight, clientWidth } = markRef.value

      canvasHeight = canvasRef.value.height =
        clientHeight * ratio
      canvasWidth = canvasRef.value.width =
        clientWidth * ratio

      canvasCtx.value?.scale(1 / ratio, 1 / ratio)
    }
  }

  const computedSpacing = () => {
    const { spacing } = props

    if (typeof spacing === 'number') {
      realSpacing = spacing
      return
    }
    const [, amount = 20, unit = 'vw'] =
      // eslint-disable-next-line no-sparse-arrays
      /([0-9]+)([A-Za-z]+)/.exec(spacing) ?? [, 20, 'vw']

    if (unit === 'px') {
      realSpacing = Number(amount)
    } else if (unit === 'vh') {
      const height = window.screen.height
      realSpacing = (Number(amount) * height) / 100
    } else if (unit === 'vw') {
      const width = window.screen.width
      realSpacing = (Number(amount) * width) / 100
    }

    realSpacing *= ratio
  }

  const draw = () => {
    const { content } = props

    const fontSize = FONT_SIZE * ratio
    const contentLength = content.length * fontSize
    const xCount = Math.ceil(
      (canvasWidth * ratio) / (contentLength + realSpacing)
    )
    const yCount = Math.ceil(
      (canvasHeight * ratio) / (fontSize + realSpacing)
    )

    if (canvasCtx.value) {
      canvasCtx.value.font = `${fontSize}px DIDIFD-Medium, "Helvetica Neue",Helvetica,"PingFang SC","Hiragino Sans GB","Microsoft YaHei","微软雅黑",Arial,sans-serif`
      canvasCtx.value.fillStyle = FILL_COLOR

      let ctxX = 0
      let ctxY = 0
      for (let y = 0; y < yCount; y++) {
        ctxX = 0
        for (let x = 0; x < xCount; x++) {
          canvasCtx.value.fillText(content, ctxX, ctxY)
          ctxX += contentLength
        }
        ctxY += fontSize + realSpacing
      }
    }
  }

  onMounted(() => {
    ratio = Math.max(getDpr(), 2)

    initCanvas()
    computedSpacing()
    draw()
  })

  return {
    markRef,
    canvasRef,
  }
}
