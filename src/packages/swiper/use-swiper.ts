import BScroll from '@better-scroll/core'
import Slide from '@better-scroll/slide'
import {
  computed,
  onMounted,
  PropType,
  ref,
  provide,
  unref as $,
  reactive,
  getCurrentInstance,
  onBeforeUnmount,
  watch,
} from 'vue'
import { Dragger } from './dragger'

import type { Options } from '@better-scroll/core'
import type {
  ExtractPropTypes,
  InjectionKey,
  Ref,
  SetupContext,
} from 'vue'

export interface swiperContext {
  currentIndex: number
}

export const BEFORE_CHANGE = 'beforeChange'
export const AFTER_CHANGE = 'afterChange'

export const swiperProps = {
  autoplay: {
    type: Number,
    default: 3000,
    validator: (value: number) => {
      if (value === 0) {
        return true
      }
      return value >= 500
    },
  },
  transition: {
    type: String as PropType<'slide' | 'slideY' | 'fade'>,
    default: 'slide',
    validator: (value: string) => {
      return ['slide', 'slideY', 'fade'].includes(value)
    },
  },
  defaultIndex: {
    // display index
    type: Number,
    default: 0,
    validator: (value: number) => {
      return value > -1
    },
  },
  hasDots: {
    type: Boolean,
    default: true,
  },
  isPrevent: {
    type: Boolean,
    default: true,
  },
  isLoop: {
    type: Boolean,
    default: true,
  },
  dragable: {
    type: Boolean,
    default: true,
  },
}

export function createSwiper(
  el: string | HTMLElement,
  options?: Options
): BScroll {
  BScroll.use(Slide)

  return new BScroll(el, {
    bounce: false,
    deceleration: 0.1,
    probeType: 3,
    momentum: false,
    ...options,
  })
}

export const swiperKey: InjectionKey<swiperContext> =
  'swiper' as any

export const useSwiper = (
  props: ExtractPropTypes<typeof swiperProps>,
  {
    emit,
    slots,
  }: SetupContext<('beforeChange' | 'afterChange')[]>
) => {
  let swiperInstance: null | BScroll = null
  const wrapRef = ref<null | HTMLElement>(null)

  const isVertical = computed(
    () => props.transition === 'slideY'
  )

  const indicatorCount = computed(
    () =>
      (slots.default?.()[0].children?.length as number) || 0
  )

  const initSwiper = () => {
    wrapRef.value &&
      !swiperInstance &&
      (swiperInstance = createSwiper(wrapRef.value, {
        scrollX: !isVertical.value,
        scrollY: isVertical.value,
        slide: {
          threshold: 100,
          autoplay: props.autoplay !== 0,
          interval: props.autoplay,
          startPageXIndex: !isVertical.value
            ? props.defaultIndex
            : 0,
          startPageYIndex: isVertical.value
            ? props.defaultIndex
            : 0,
          loop: props.isLoop,
        },
        click: !props.isPrevent,
        disableTouch: !props.dragable,
        disableMouse: !props.dragable,
      }))
  }

  const currentIndex = ref(props.defaultIndex)
  const indexChange = (index: number) => {
    currentIndex.value = index
  }

  const renderSwiper = () => {
    initSwiper()

    swiperInstance?.on(
      'slidePageChanged',
      (page: { pageX: number; pageY: number }) => {
        const pageNumber = $(isVertical)
          ? page.pageY
          : page.pageX

        emit(AFTER_CHANGE, currentIndex.value, pageNumber)
        indexChange(pageNumber)
      }
    )

    swiperInstance?.on(
      'slideWillChange',
      (page: { pageX: number; pageY: number }) => {
        const pageNumber = $(isVertical)
          ? page.pageY
          : page.pageX

        emit(BEFORE_CHANGE, currentIndex.value, pageNumber)
        indexChange(pageNumber)
      }
    )
  }

  const resetSwiper = () => {
    if (swiperInstance) {
      swiperInstance.destroy()
      swiperInstance = null
      renderSwiper()
    }
  }

  onMounted(() => {
    const rect = wrapRef.value?.getBoundingClientRect()
    props.transition !== 'fade' &&
      rect?.width &&
      rect.height &&
      renderSwiper()

    /**
     * fade
     */
    props.transition === 'fade' &&
      wrapRef.value &&
      onScrollHandler(
        wrapRef.value,
        currentIndex,
        props,
        emit
      )
  })

  onBeforeUnmount(() => {
    swiperInstance?.destroy()
  })

  provide(
    swiperKey,
    reactive({
      currentIndex,
    })
  )

  const getSwiperInstance = () => swiperInstance

  return {
    wrapRef,
    renderSwiper,
    resetSwiper,

    indicatorCount,
    currentIndex,

    getSwiperInstance,
    isVertical,
  }
}

function onScrollHandler(
  wrap: HTMLElement,
  currentIndex: Ref<number>,
  props: ExtractPropTypes<typeof swiperProps>,
  emit: SetupContext<
    ('beforeChange' | 'afterChange')[]
  >['emit']
) {
  /**
   * get dom arrts
   */
  const speed = 400
  const position = reactive({
    x: 0,
    y: 0,
    deltaX: 0,
    draging: false,
  })
  const compInstance = getCurrentInstance()
  const children = (
    compInstance?.proxy?.$el as HTMLElement
  ).querySelector('.md-swiper-container')?.children
  const itemRect = children?.[0]?.getBoundingClientRect()
  const items = Array.from(children || []) as HTMLElement[]

  /**
   * init dom status
   */
  wrap.style.height = itemRect?.height
    ? itemRect?.height + 'px'
    : '0px'
  items[0].style.opacity = '1'

  /**
   * init Dragger
   */
  const dragger = new Dragger(wrap, position)
  onBeforeUnmount(() => dragger.destory())

  /**
   * default transition
   * other listen touch
   */
  watch(
    () => position.deltaX,
    (val) => {
      const slide =
        Math.abs(val) > (itemRect?.width || 0) / 5
      const next = val < 0
      if (slide) {
        next
          ? (currentIndex.value = currentIndex.value + 1)
          : (currentIndex.value = currentIndex.value - 1)
        if (currentIndex.value === -1)
          currentIndex.value = items.length - 1
        if (currentIndex.value === items.length)
          currentIndex.value = 0
      }
    }
  )

  watch(currentIndex, (val, oldVal) => {
    items.forEach((item) => {
      item.style.transition = `opacity ${speed}ms cubic-bezier(0.25, 0.46, 0.45, 0.94)`
      item.style.opacity = '0'
      item.style.zIndex = '0'
      item.ontransitionend = null
      item.ontransitionstart = null
    })
    const ele = items[val]
    ele.style.opacity = '1'
    ele.style.zIndex = '1'
    ele.ontransitionstart = function () {
      emit(BEFORE_CHANGE, oldVal, val)
    }
    ele.ontransitionend = function () {
      emit(AFTER_CHANGE, oldVal, val)
    }
  })

  /**
   * loop
   */
  watch(
    () => position.draging,
    (val) => {
      val ? stop() : startPlay()
    }
  )
  let timer: number | null

  const clearTimer = () => {
    if (timer) clearTimeout(timer)
    timer = null
  }

  const startPlay = () => {
    if (props.autoplay > 500 && items.length > 1) {
      clearTimer()
      timer = globalThis.setInterval(() => {
        currentIndex.value = currentIndex.value + 1
        if (
          !props.isLoop &&
          currentIndex.value === items.length - 1
        ) {
          stopPlay()
          return
        }

        if (currentIndex.value === -1)
          currentIndex.value = items.length - 1
        if (currentIndex.value === items.length)
          currentIndex.value = 0
      }, props.autoplay + speed) as any as number
    }
  }

  const stopPlay = () => {
    clearTimer()
  }

  startPlay()
  onBeforeUnmount(() => stopPlay())
}
