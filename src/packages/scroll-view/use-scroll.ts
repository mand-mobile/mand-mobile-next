import {
  computed,
  onBeforeMount,
  onMounted,
  ref,
  watch,
} from 'vue'
import BScroll from '@better-scroll/core'
import PullDown from '@better-scroll/pull-down'
import Pullup from '@better-scroll/pull-up'
import { t } from 'mand-mobile/locale'

import type {
  ExtractPropTypes,
  SetupContext,
  PropType,
} from 'vue'
import type { Options } from '@better-scroll/core'

export const PULLING_DOWN_EVNET = 'pullingDown'
export const PULLING_UP_EVENT = 'pullingUp'
export const SCROLL = 'scroll'
export const scrollProps = {
  scrollingX: {
    type: Boolean,
    default: false,
  },
  scrollingY: {
    type: Boolean,
    default: true,
  },
  bouncing: {
    type: Boolean,
    default: true,
  },
  pullDown: {
    type: Boolean,
    default: false,
  },
  pullUp: {
    type: Boolean,
    default: false,
  },
  bounceTime: {
    type: Number,
    default: 800,
  },
  isPrevent: {
    type: Boolean,
    default: true,
  },
  pullDownOptions: {
    type: Object as PropType<{
      threshold: number
      stop: number
    }>,
    default: {
      threshold: 60,
      stop: 50,
    },
  },
  pullUpOtions: {
    type: Object as PropType<{
      threshold: number
    }>,
    default: {
      threshold: 0,
    },
  },
  isFinished: {
    type: Boolean,
    default: false,
  },
}

export const useScroll = (
  props: ExtractPropTypes<typeof scrollProps>,
  {
    emit,
    slots,
  }: SetupContext<
    ('pullingDown' | 'scroll' | 'pullingUp')[]
  >
) => {
  const scrollPosition = ref({
    x: 0,
    y: 0,
  })

  const beforePullDown = ref(true)
  const isPullingDown = ref(false)
  const canFreePullingDown = ref(false)
  const pullDownPercent = computed(
    () =>
      (scrollPosition.value.y - 10) /
      props.pullDownOptions.threshold
  )

  const isPullUpLoad = ref(false)

  const pullDownText = computed(() => {
    if (beforePullDown.value) {
      return canFreePullingDown.value
        ? t('md.scroll-view.refresh.freedRefresh')
        : t('md.scroll-view.refresh.pullDownRefresh')
    } else {
      return isPullingDown.value
        ? t('md.scroll-view.refresh.refreshing')
        : t('md.scroll-view.refresh.success')
    }
  })

  const pullUpText = computed(() =>
    props.isFinished
      ? t('md.scroll-view.more.allLoaded')
      : isPullUpLoad.value
      ? t('md.scroll-view.more.loading')
      : t('md.scroll-view.more.loading')
  )

  let scrollerInstance: null | BScroll = null
  const wrapRef = ref<HTMLElement | null>(null)

  const initScroller = () => {
    if (wrapRef.value) {
      scrollerInstance = createScroller(
        wrapRef.value,
        props.pullDown,
        props.pullUp,
        {
          scrollX: props.scrollingX,
          scrollY: props.scrollingY,
          bounce: props.bouncing,
          bounceTime: props.bounceTime,
          click: !props.isPrevent,
          pullDownRefresh: props.pullDownOptions,
          pullUpLoad: props.pullUpOtions,
        }
      )

      props.pullDown &&
        scrollerInstance.on(
          PULLING_DOWN_EVNET,
          pullingDownHandler
        )

      props.pullUp &&
        scrollerInstance.on(
          PULLING_UP_EVENT,
          pullingUpHandler
        )

      scrollerInstance.on(SCROLL, scrollHandler)
    }
  }

  const resetScroller = () => {
    if (scrollerInstance) {
      scrollerInstance.destroy()
      scrollerInstance = null
      initScroller()
    }
  }

  const getScrollerInstance = () => scrollerInstance

  const scrollHandler = (position: {
    x: number
    y: number
  }) => {
    // console.log(position.y)
    if (position.y > props.pullDownOptions.threshold + 10) {
      canFreePullingDown.value = true
    }

    scrollPosition.value = position

    emit(SCROLL, position)
  }

  const pullingDownHandler = () => {
    beforePullDown.value = false
    isPullingDown.value = true

    emit(PULLING_DOWN_EVNET)
  }

  const finishPullDown = () => {
    isPullingDown.value = false
    canFreePullingDown.value = false
    getScrollerInstance()?.finishPullDown()

    setTimeout(() => {
      beforePullDown.value = true
      getScrollerInstance()?.refresh()
    }, props.bounceTime + 100)
  }

  const pullingUpHandler = () => {
    isPullUpLoad.value = true
    emit(PULLING_UP_EVENT)
  }

  const finishPullUp = () => {
    getScrollerInstance()?.finishPullUp()

    setTimeout(() => {
      getScrollerInstance()?.refresh()
    }, 100)

    isPullUpLoad.value = false
  }

  watch(
    () => props.isFinished,
    (val) => {
      val && getScrollerInstance()?.closePullUp()
    }
  )

  onMounted(() => {
    initScroller()
  })

  onBeforeMount(() => {
    getScrollerInstance()?.destroy()
  })

  return {
    wrapRef,
    getScrollerInstance,
    resetScroller,

    finishPullDown,
    beforePullDown,
    canFreePullingDown,
    isPullingDown,
    pullDownText,
    pullDownPercent,

    finishPullUp,
    isPullUpLoad,
    pullUpText,
  }
}

function createScroller(
  el: string | HTMLElement,
  pullDown = true,
  pullUp = true,
  options?: Options
): BScroll {
  if (pullDown) BScroll.use(PullDown)
  if (pullUp) BScroll.use(Pullup)
  return new BScroll(el, {
    scrollX: false,
    scrollY: true,
    probeType: 3,
    tap: 'tap',
    bounceTime: 800,
    click: true,
    ...options,
  })
}
