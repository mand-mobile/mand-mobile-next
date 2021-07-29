import {
  provide,
  inject,
  reactive,
  ref,
  onMounted,
  watch,
  onBeforeUnmount,
  nextTick,
} from 'vue'
import { CHANGE_EVENT } from 'mand-mobile-next/utils'

import type {
  InjectionKey,
  ExtractPropTypes,
  ComponentPublicInstance,
  SetupContext,
} from 'vue'
import type Slide from '@better-scroll/slide'
import type BScroll from '@better-scroll/core'

interface tabsContext {
  addItem: (item: Item) => number
  removeItem: (index: Item) => void
}

type Item = ExtractPropTypes<typeof paneProps>

export const tabsKey: InjectionKey<tabsContext> =
  'Tabs' as any

export const tabsProps = {
  hasInk: {
    type: Boolean,
    default: true,
  },
  defaultIndex: {
    type: Number,
    default: 0,
  },
  immediate: {
    type: Boolean,
    default: false,
  },
  inkLength: {
    type: Number,
    default: 0,
  },
}

export const paneProps = {
  label: {
    type: String,
    default: '',
  },
  name: {
    type: String,
    default: '',
  },
  disabled: {
    type: Boolean,
    default: false,
  },
}

export const useTabs = (
  props: ExtractPropTypes<typeof tabsProps>,
  { emit }: SetupContext<'change'[]>
) => {
  const tabItems = ref<Item[]>([])
  const addItem = (item: Item) => {
    tabItems.value.push(item)
    return tabItems.value.length - 1
  }
  const removeItem = (item: Item) => {
    const index = tabItems.value.findIndex(
      (t) => t.name === item.name && t.label === t.label
    )
    tabItems.value.splice(index, 1)
  }

  provide(
    tabsKey,
    reactive({
      addItem,
      removeItem,
    })
  )

  /**
   * relative to tabbar & swiper
   */
  const swiperRef =
    ref<ComponentPublicInstance<{
      getSwiperInstance: () => Slide
      resetSwiper: () => void
    }> | null>(null)
  const currentIndex = ref(props.defaultIndex)

  const changeHandler = function (
    _: {
      [k: string]: any
      name: string | number
      label: string | number
      disabled?: boolean | undefined
    },
    index: number
  ) {
    currentIndex.value = index
    swiperRef.value?.getSwiperInstance()?.goToPage(index, 0)
  }

  const swiperChangeHandler = (_: number, to: number) => {
    currentIndex.value = to
    emit(CHANGE_EVENT, {
      ...tabItems.value[currentIndex.value],
      index: currentIndex.value,
    })
  }

  /**
   * refresh scroller after disabled change
   */
  watch(
    tabItems,
    () => {
      ;(
        swiperRef.value?.getSwiperInstance() as unknown as BScroll
      )?.refresh()
    },
    {
      deep: true,
    }
  )

  onMounted(() => {
    /**
     * init position
     */
    swiperRef.value
      ?.getSwiperInstance()
      ?.goToPage?.(currentIndex.value, 0)
    if (props.immediate)
      emit(CHANGE_EVENT, {
        ...tabItems.value[currentIndex.value],
        index: currentIndex.value,
      })
  })

  return {
    tabItems,

    swiperRef,
    currentIndex,
    changeHandler,
    swiperChangeHandler,
  }
}

export const usePane = (
  props: ExtractPropTypes<typeof paneProps>
) => {
  const { addItem, removeItem } = inject(
    tabsKey,
    {} as tabsContext
  )

  addItem(props)
  onBeforeUnmount(() => {
    removeItem(props)
  })
}
