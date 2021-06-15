import {
  ref,
  computed,
  onMounted,
  reactive,
  nextTick,
} from 'vue'

import type { ExtractPropTypes } from 'vue'
import { transformCamelCase } from 'mand-mobile/utils'

export const tagProps = {
  size: {
    type: String, // tiny, small, large
    default: 'large',
  },
  shape: {
    // square, circle, fillet, quarter, coupon, bubble
    type: String,
    default: 'square',
  },
  sharp: {
    // top-left, top-right, bottom-left, bottom-right
    type: String,
    default: '',
  },
  type: {
    // fill ghost
    type: String,
    default: 'ghost',
  },
  fillColor: {
    type: String,
    default: '',
  },
  fontWeight: {
    // normal, bold, bolder
    type: String,
    default: 'normal',
  },
  fontColor: {
    type: String,
    default: '',
  },
}

export const useTag = (
  props: ExtractPropTypes<typeof tagProps>
) => {
  const tagRef = ref<HTMLElement | null>(null)
  const sizeStyle = reactive<{
    [key: string]: string | number
  }>({})

  const computedClass = computed(() => {
    const { size, shape, type, fontWeight } = props
    return [
      'default',
      `size-${size}`,
      `shape-${shape}`,
      `type-${type}`,
      `font-weight-${fontWeight}`,
    ]
  })

  const colorStyle = computed(() => {
    const style: {
      [key: string]: string | number
    } = {}
    const { fillColor, type, fontColor } = props
    if (type === 'fill' && fillColor) {
      style.background = fillColor
    }
    if (fontColor) {
      if (type === 'ghost') {
        style.borderColor = fontColor
      }
      style.color = fontColor
    }
    return style
  })

  // 挂载
  onMounted(() => {
    nextTick(() => {
      const { shape, sharp } = props
      if (shape === 'circle') {
        const radius =
          (tagRef.value?.offsetHeight || 20) / 2
        const radiusStr = radius + 'px'
        sizeStyle.paddingLeft = radiusStr
        sizeStyle.paddingRight = radiusStr
        sizeStyle.borderRadius = radiusStr

        if (sharp) {
          const borderClass = transformCamelCase(
            `border-${sharp}-radius`
          )
          sizeStyle[borderClass] = 0
        }
      }
    })
  })

  return {
    sizeStyle,
    computedClass,
    tagRef,
    colorStyle,
  }
}
