import {
  computed,
  onBeforeUnmount,
  onBeforeUpdate,
  onMounted,
  reactive,
  ref,
  watch,
  nextTick,
} from 'vue'
import { UPDATE_MODEL_EVENT } from 'mand-mobile-next/utils'
import { Dragger } from 'mand-mobile-next/swiper'
import type {
  ComponentPublicInstance,
  ExtractPropTypes,
  PropType,
  SetupContext,
  Ref,
  WatchStopHandle,
} from 'vue'

type UnReadOnly<T> = {
  -readonly [P in keyof T]: T[P]
}

type Position = UnReadOnly<
  Omit<DOMRect, 'toJSON' | 'x' | 'y'>
>

export const sliderProps = {
  modelValue: {
    type: [Array, Number] as PropType<number[] | number>,
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
    validator: (value: number) => {
      return value > 0 && Number.isSafeInteger(value)
    },
  },
  /**
   * @deprecated
   */
  range: {
    type: Boolean,
    default: false,
  },
  format: {
    type: Function as PropType<
      (val: number | string) => string
    >,
    default: (val: number | string) => {
      return val
    },
  },
  disabled: {
    type: Boolean,
    default: false,
  },
  hasTip: {
    type: Boolean,
    default: true,
  },
  tipPlacement: {
    type: String as PropType<'top' | 'bottom'>,
    default: 'top',
  },
}

export const useSlider = (
  props: ExtractPropTypes<typeof sliderProps>,
  { emit }: SetupContext<'update:modelValue'[]>
) => {
  const tipRef =
    ref<ComponentPublicInstance<{
      triggerShow: (show: boolean) => void
      setPosition: () => void
    }> | null>(null)
  const tipRefHigther =
    ref<ComponentPublicInstance<{
      triggerShow: (show: boolean) => void
      setPosition: () => void
    }> | null>(null)
  const barRef = ref<HTMLElement | null>(null)
  const barPosition = ref<Position>({
    width: 0,
    height: 0,
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
  })

  const draggers = ref<(Element | null)[]>([])
  const currentDragger = ref<HTMLElement | null>(null)

  const { position, winDragger } = initWindowDrag()
  /**
   * slider bar style
   */
  const currentWidth = ref(0)
  const currentLeft = ref(0)

  let stopper: WatchStopHandle | null = null

  /**
   * split width by value
   */
  let perSplitWidth: number

  const isRange = computed(() =>
    Array.isArray(props.modelValue)
  )

  const realValue = computed({
    get: () => props.modelValue,
    set: (val: number[] | number) =>
      emit(UPDATE_MODEL_EVENT, val),
  })

  /**
   * make template ref array is fresh
   */
  onBeforeUpdate(() => {
    draggers.value = []
  })

  onMounted(() => {
    Object.keys(barPosition.value).forEach((key) => {
      barPosition.value[key as keyof Position] =
        barRef.value?.getBoundingClientRect()[
          key as keyof Position
        ] ?? 0
    })
    /**
     * init first render
     */
    perSplitWidth =
      barPosition.value.width / (props.max - props.min)

    currentWidth.value = !isRange.value
      ? ((props.modelValue as any) - props.min) *
        perSplitWidth
      : ((props.modelValue as any)[1] -
          (props.modelValue as any)[0]) *
        perSplitWidth

    currentLeft.value = !isRange.value
      ? 0
      : ((props.modelValue as any)[0] - props.min) *
        perSplitWidth

    if (!isRange.value) {
      ;(
        draggers.value as any
      )[0].style.left = `${currentWidth.value}px`
    } else {
      ;(
        draggers.value as any
      )[0].style.left = `${currentLeft.value}px`
      ;(draggers.value as any)[1].style.left = `${
        currentLeft.value + currentWidth.value
      }px`
    }
  })

  const dragStartHandler = (e: UIEvent) => {
    /**
     * set currentDragger important
     */
    winDragger.initEvent()
    dragStart(e, currentDragger)
    /**
     * make current tip show
     */
    const isFirstDragger = (
      draggers.value[0] as any
    )?.contains(currentDragger.value)

    props.hasTip &&
      (isFirstDragger
        ? tipRef.value?.triggerShow(true)
        : tipRefHigther.value?.triggerShow(true))

    stopper = watch(
      () => position.x,
      (val) => {
        const { x: wrapperX, width: wrapperWidth } =
          barRef.value?.getBoundingClientRect() ?? {
            x: 0,
            width: 0,
          }
        const currentDraggerParent: any =
          currentDragger.value?.parentElement
        /**
         * gap for jump
         */
        const gap = Math.round(
          (val - wrapperX) / perSplitWidth
        )
        const formatGap =
          Math.round(gap / props.step) * props.step

        const atEnd = val > wrapperWidth + wrapperX

        if (val - wrapperX > 0 && !atEnd) {
          if (isRange.value) {
            /**
             * range model
             */
            realValue.value = isFirstDragger
              ? [
                  Math.min(
                    formatGap + props.min,
                    (props.modelValue as any)[1]
                  ),
                  (props.modelValue as any)[1],
                ]
              : [
                  (props.modelValue as any)[0],
                  Math.max(
                    formatGap + props.min,
                    (props.modelValue as any)[0]
                  ),
                ]

            nextTick(() => {
              currentWidth.value =
                ((props.modelValue as any)[1] -
                  (props.modelValue as any)[0]) *
                perSplitWidth
              /**
               * set left
               */
              currentLeft.value =
                ((props.modelValue as any)[0] - props.min) *
                perSplitWidth
              currentDraggerParent.style.left =
                isFirstDragger
                  ? `${currentLeft.value}px`
                  : `${
                      currentLeft.value + currentWidth.value
                    }px`
            })
          } else {
            realValue.value = formatGap + props.min
            currentWidth.value = formatGap * perSplitWidth
            currentDraggerParent.style.left = `${currentWidth.value}px`
          }
        }
      }
    )
  }
  const dragEndHandler = () => {
    props.hasTip &&
      ((draggers.value[0] as any)?.contains(
        currentDragger.value
      )
        ? tipRef.value?.triggerShow(false)
        : tipRefHigther.value?.triggerShow(false))

    stopper?.()
    stopper = null
  }

  watch(
    () => position.draging,
    (val) => {
      const parent = currentDragger.value?.parentElement
      if (val && parent) {
        parent.classList.add('is-active')
      } else if (parent) {
        parent.classList.remove('is-active')
        dragEnd(currentDragger)
        winDragger.destroy()
      }
    }
  )

  onBeforeUnmount(() => {
    winDragger.destroy()
  })

  return {
    tipRef,
    tipRefHigther,
    barRef,
    draggers,
    position,
    dragStartHandler,
    dragEndHandler,
    currentWidth,
    currentLeft,
    realValue,
    isRange,
  }
}

/**
 * It should be a reactive Obj. important
 * @param position
 */
function initWindowDrag() {
  const position = reactive({
    x: 0,
    y: 0,
    deltaX: 0,
    draging: false,
  })
  const winDragger = new Dragger(
    window as unknown as HTMLElement,
    position
  )

  winDragger.isPrevent = false
  winDragger.destroy()

  return {
    winDragger,
    position,
  }
}

/**
 * dragger
 */
function dragStart(
  e: UIEvent,
  currentTarget: Ref<HTMLElement | null>
) {
  e.preventDefault()
  e.stopPropagation()
  currentTarget.value = e.target as HTMLElement
}

function dragEnd(currentTarget: Ref<HTMLElement | null>) {
  currentTarget.value = null
}
