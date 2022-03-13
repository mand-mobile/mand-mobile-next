import {
  reactive,
  ref,
  onMounted,
  onBeforeUnmount,
  watch,
  nextTick,
} from 'vue'
import { Dragger } from 'mand-mobile-next/swiper'
import { getDpr } from 'mand-mobile-next/utils'

import type { ExtractPropTypes } from 'vue'

export const drawerProps = {
  text: {
    type: String,
    default: '删除',
  },
}

export const useDrawer = (
  props?: ExtractPropTypes<typeof drawerProps>
) => {
  const contentRef = ref<HTMLElement | null>(null)
  const operationRef = ref<HTMLElement | null>(null)
  const active = ref(false)

  onMounted(() => {
    const operationRect =
      operationRef.value?.getBoundingClientRect()
    const dpr = Math.max(getDpr(), 2)

    if (contentRef.value) {
      const { dragger, position } = initDrag(
        contentRef.value
      )

      watch(
        () => position.x,
        (val) => {
          const delta = val - dragger.startX
          if (
            !active.value &&
            delta < 0 &&
            Math.abs(delta) < (operationRect?.width ?? 0)
          ) {
            const prefDelta = Math.ceil(delta)
            contentRef.value?.setAttribute(
              'style',
              `transform: translateX(${prefDelta}px)`
            )
          }

          if (active.value && delta >= 0) {
            contentRef.value?.setAttribute(
              'style',
              `transform: translateX(${
                delta - (operationRect?.width ?? 0) > 0
                  ? 0
                  : delta - (operationRect?.width ?? 0)
              }px)`
            )
          }
        }
      )

      watch(
        () => position.draging,
        (val) => {
          if (!val) {
            nextTick(() => {
              position.deltaX < 0 &&
                Math.abs(position.deltaX) >
                  (operationRect?.width ?? 0 * dpr) / 4 &&
                (contentRef.value?.setAttribute(
                  'style',
                  `transform: translateX(-${operationRect?.width}px); transition: all .3s cubic-bezier(0.165, 0.84, 0.44, 1)`
                ),
                (active.value = true))
              ;(position.deltaX > 0 ||
                (position.deltaX < 0 &&
                  Math.abs(position.deltaX) <=
                    (operationRect?.width ?? 0 * dpr) /
                      4)) &&
                (contentRef.value?.setAttribute(
                  'style',
                  `transform: translateX(0px); transition: all .3s cubic-bezier(0.165, 0.84, 0.44, 1)`
                ),
                (active.value = false))
            })
          }
        }
      )

      onBeforeUnmount(() => {
        dragger.destroy()
      })
    }
  })

  return {
    contentRef,
    operationRef,
  }
}

function initDrag(el: HTMLElement) {
  const position = reactive({
    x: 0,
    y: 0,
    deltaX: 0,
    draging: false,
  })
  const dragger = new Dragger(el, position)

  return {
    dragger,
    position,
  }
}
