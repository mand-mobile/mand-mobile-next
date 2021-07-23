import { ref, onMounted, computed, watch } from 'vue'
import {
  traverse,
  compareObjects,
  SHOW_EVENT,
  HIDE_EVENT,
  CHANGE_EVENT,
} from 'mand-mobile-next/utils'
import type { Ref, SetupContext } from 'vue'

/**
 * todo more check
 */
interface IPropsParams {
  data: Array<{
    text: string
    options: Array<{
      value: string
      text: string
    }>
    disabled?: boolean
    [key: string]: any
  }>
  defaultValue: Array<any>
}

export const useDropMenu = (
  props: IPropsParams,
  {
    emit,
    slots,
  }: SetupContext<('show' | 'hide' | 'change')[]>
) => {
  const isPopupShow = ref(false)

  const hasSlot = computed(() => {
    return !!slots.default
  })

  watch(
    () => props.data,
    (val, oldVal) => {
      if (!compareObjects(val, oldVal)) {
        initSelectedBar(
          selectedMenuListValue,
          props,
          selectedMenuListItem
        )
      }
    }
  )

  watch(
    () => props.defaultValue,
    (val, oldVal) => {
      if (!compareObjects(val, oldVal)) {
        initSelectedBar(
          selectedMenuListValue,
          props,
          selectedMenuListItem
        )
      }
    }
  )

  const onListShow = () => {
    setScroller(boxRef.value, menuRef.value, scroller)
    emit(SHOW_EVENT)
  }

  const onListHide = () => {
    emit(HIDE_EVENT)
  }

  const onListBeforeHide = () => {
    activeMenuBarIndex.value = -1
  }

  const activeMenuBarIndex = ref(-1)
  const activeMenuListData = computed(() => {
    if (
      activeMenuBarIndex.value < 0 ||
      !props.data[activeMenuBarIndex.value]
    ) {
      return []
    }
    return props.data[activeMenuBarIndex.value].options
  })

  const getBarItemText = (
    item: IPropsParams['data'][0],
    index: number
  ) => {
    return selectedMenuListItem.value[index] !== undefined
      ? selectedMenuListItem.value[index].text
      : item.text
  }

  const onBarItemClick = (
    barItem: IPropsParams['data'][0],
    index: number
  ) => {
    if (!barItem || barItem.disabled) {
      return
    }
    if (!isPopupShow.value) {
      isPopupShow.value = true
      activeMenuBarIndex.value = index
    } else {
      isPopupShow.value = false
    }
  }

  const selectedMenuListItem = ref<IPropsParams['data']>([])
  const checkBarItemSelect = (index: number) => {
    return !!(
      selectedMenuListItem.value[index] !== undefined ||
      props.defaultValue[index]
    )
  }

  const selectedMenuListValue = ref<Array<any>>([])
  const onListItemClick = (
    listItem: IPropsParams['data'][0]
  ) => {
    const activeIndex = activeMenuBarIndex.value
    const barItem = props.data[activeIndex]

    isPopupShow.value = false
    selectedMenuListValue.value[activeIndex] =
      listItem.value
    selectedMenuListItem.value[activeIndex] = listItem
    emit(CHANGE_EVENT, barItem, listItem)
  }

  const scroller = ref('')
  const boxRef = ref<HTMLElement | null>(null)
  const menuRef = ref<HTMLElement | null>(null)
  onMounted(() => {
    initSelectedBar(
      selectedMenuListValue,
      props,
      selectedMenuListItem
    )
  })

  return {
    hasSlot,
    isPopupShow,

    onListShow,
    onListHide,
    onListItemClick,
    onListBeforeHide,
    activeMenuListData,

    getBarItemText,
    onBarItemClick,
    checkBarItemSelect,
    activeMenuBarIndex,
    selectedMenuListValue,

    scroller,
    boxRef,
    menuRef,
  }
}

/**
 * ??
 */
function initSelectedBar(
  selectedMenuListValue: Ref<Array<any>>,
  props: IPropsParams,
  selectedMenuListItem: Ref<IPropsParams['data']>
) {
  selectedMenuListValue.value = props.defaultValue
  traverse(
    props.data,
    ['options'],
    (item, _level, indexs) => {
      const barItemIndex = indexs[0]
      const defaultValue = props.defaultValue[barItemIndex]
      if (
        defaultValue !== undefined &&
        (item.value === defaultValue ||
          item.text === defaultValue ||
          item.label === defaultValue)
      ) {
        selectedMenuListItem.value[barItemIndex] = item
        return false
      }
    }
  )
}

/**
 * scroller ?？
 */
function setScroller(
  boxRef: HTMLElement | null,
  menuRef: HTMLElement | null,
  scroller: Ref<string>
) {
  const boxer = menuRef ? boxRef : null
  if (
    boxer &&
    menuRef &&
    boxer.clientHeight >= menuRef.clientHeight
  ) {
    scroller.value = '.md-drop-menu-list'
  } else {
    scroller.value = ''
  }
}
