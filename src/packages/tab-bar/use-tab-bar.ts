import BScroll from '@better-scroll/core'
import {
  computed,
  onMounted,
  ref,
  watch,
  unref as $,
  nextTick,
} from 'vue'
import {
  UPDATE_MODEL_EVENT,
  CHANGE_EVENT,
} from 'mand-mobile/utils'

import type {
  ExtractPropTypes,
  PropType,
  SetupContext,
} from 'vue'
import type { Options } from '@better-scroll/core'

export type PropsItem = ExtractPropTypes<
  typeof tabBarProps
>['items'][0]

export const tabBarProps = {
  modelValue: {
    type: [String, Number],
    default: '',
  },
  items: {
    type: Array as PropType<
      Array<{
        name: string | number
        label: string | number
        disabled?: boolean
        [k: string]: any
      }>
    >,
    default: () => [],
  },
  hasInk: {
    type: Boolean,
    default: true,
  },
  inkLength: {
    type: Number,
    default: 0,
  },
  immediate: {
    type: Boolean,
    default: false,
  },
}

export const useTabBar = (
  props: ExtractPropTypes<typeof tabBarProps>,
  { emit }: SetupContext<('update:modelValue' | 'change')[]>
) => {
  let scrollerInstance: BScroll | null = null
  const wrapRef = ref<HTMLElement | null>(null)
  const contentRef = ref<HTMLElement | null>(null)

  const scrollable = ref(false)
  const initScroller = () => {
    if (scrollerInstance) {
      scrollerInstance.destroy()
      scrollerInstance = null
    }
    wrapRef.value &&
      (scrollerInstance = createScroller(wrapRef.value))
  }

  /**
   * if scrollable is true, init scroller
   */
  function scrollableHandler() {
    const wrapperWidth =
      wrapRef.value?.getBoundingClientRect().width ?? 0
    const contentWidth = Array.from(
      contentRef.value?.children || []
    ).reduce(
      (prev, next) =>
        prev + next.getBoundingClientRect().width,
      0
    )
    scrollable.value =
      Math.ceil(wrapperWidth - contentWidth) < 0
    if (scrollable.value) {
      ;(
        (wrapRef.value as HTMLElement).querySelector(
          '.md-tab-bar-list'
        ) as HTMLElement
      ).style.display = 'inline-block'

      initScroller()
      /**
       * mask show/hide logic
       */
      maskHandler(wrapperWidth, contentWidth)
    }
  }

  /**
   * startmask/endmask
   */
  const maskStartShown = ref(false)
  const maskEndShown = ref(true)

  function maskHandler(
    wrapperWidth: number,
    contentWidth: number
  ) {
    const gap = 10 // items padding
    scrollerInstance?.on(
      'scroll',
      (page: { x: number }) => {
        page.x < 0 && Math.abs(page.x) > gap
          ? (maskStartShown.value = true)
          : (maskStartShown.value = false)

        Math.abs(page.x) > contentWidth - wrapperWidth - gap
          ? (maskEndShown.value = false)
          : (maskEndShown.value = true)
      }
    )
  }

  /**
   * clickHandle
   * 1. v-model
   * 2. change ink position
   */
  const inkOffsetLeft = ref('0px')
  const inkWidth = ref('0px')

  const modelIndex = computed(() =>
    props.items.findIndex(
      (item) => item.name === props.modelValue
    )
  )

  const clickHandle = (
    item: ExtractPropTypes<typeof tabBarProps>['items'][0],
    index: number
  ) => {
    if (item.disabled) {
      return
    }

    setInkStyle(index)
    scrollToItem(index)

    emit(UPDATE_MODEL_EVENT, item.name)
    emit(CHANGE_EVENT, item, index)
  }

  /**
   * scrollto current item
   */
  const scrollToItem = (index: number) => {
    const itemDoms = Array.from(
      contentRef.value?.children || []
    ) as HTMLElement[]

    scrollerInstance?.scrollToElement(
      itemDoms[index],
      300,
      true,
      false
    )
  }

  /**
   * first enter init ink style
   */
  const initInkStyle = () => {
    $(modelIndex) !== -1 &&
      (setInkStyle($(modelIndex)),
      scrollToItem($(modelIndex)))

    if (props.immediate && $(modelIndex) !== -1)
      emit(
        CHANGE_EVENT,
        props.items[$(modelIndex)],
        modelIndex
      )
  }

  const setInkStyle = (index: number) => {
    // items dom position
    const itemDoms = Array.from(
      contentRef.value?.children || []
    )
    const itemsWidth = itemDoms.map(
      (item) => item.getBoundingClientRect().width
    )
    const itemsOffsets = itemDoms.map(
      (item) => (item as HTMLElement).offsetLeft
    )

    inkWidth.value = `${itemsWidth[index]}px`
    inkOffsetLeft.value = `${itemsOffsets[index]}px`

    /**
     * fallback
     */
    nextTick(() => {
      if (props.inkLength) {
        const delta = itemsWidth[index] - props.inkLength
        inkWidth.value = `${props.inkLength}px`
        inkOffsetLeft.value = `${
          itemsOffsets[index] + delta / 2
        }px`
      }
    })
  }

  /**
   * change ink position dynamic
   */
  watch(
    () => props.modelValue,
    () => {
      initInkStyle()
    }
  )

  onMounted(() => {
    scrollableHandler()
    initInkStyle()
  })

  return {
    wrapRef,
    contentRef,

    scrollable,
    maskStartShown,
    maskEndShown,

    modelIndex,
    clickHandle,
    inkWidth,
    inkOffsetLeft,
    setInkStyle,
  }
}

function createScroller(
  el: string | HTMLElement,
  options?: Options
): BScroll {
  return new BScroll(el, {
    scrollX: true,
    scrollY: false,
    probeType: 3,
    tap: 'tap',
    ...options,
  })
}
