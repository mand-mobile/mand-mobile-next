import {
  onBeforeMount,
  onMounted,
  onBeforeUpdate,
  onUpdated,
  onBeforeUnmount,
  ref,
  computed,
  watch,
  nextTick,
} from 'vue'

import BScroll from '@better-scroll/core'
import Wheel from '@better-scroll/wheel'

BScroll.use(Wheel)

import {
  UPDATE_MODEL_EVENT,
  CHANGE_EVENT,
  getDpr,
} from 'mand-mobile/utils'

import type {
  ExtractPropTypes,
  PropType,
  ComponentInternalInstance,
  SetupContext,
} from 'vue'

export type PropsItem = ExtractPropTypes<
  typeof pickerProps
>['data'][0][0]

export const pickerProps = {
  modelValue: {
    type: Array as PropType<Array<string | number>>,
    default: [],
  },
  data: {
    type: Array as PropType<
      Array<
        Array<{
          value: string | number
          text: string | number
          children?: any
          [k: string]: any
        }>
      >
    >,
    default: () => [],
  },
  cols: {
    type: Number,
    default: 1,
  },
  isView: {
    type: Boolean,
    default: false,
  },
  invalidValue: {
    type: Array as PropType<Array<Array<string | number>>>,
    default: () => [],
  },
  isCascade: {
    type: Boolean,
    default: false,
  },
  keepIndex: {
    type: Boolean,
    default: false,
  },
  lineHeight: {
    type: Number,
    default: 45,
  },
}

const dpr = getDpr()

export const usePicker = (
  props: ExtractPropTypes<typeof pickerProps>,
  { emit }: SetupContext<('update:modelValue' | 'change')[]>
) => {
  let wheelInstance: BScroll[] | null = null
  const wheelsRef = ref<HTMLElement[]>([])

  const pickerData = ref<typeof props.data>(
    Array(props.cols).fill([])
  )

  const curWheelIndex = ref<number>(-1)
  const cacheColumnIndex = ref<number>(-1)
  const cacheSelectedIndexs = ref<number[]>([])

  const isDestory = ref(false)

  // init wheel item height
  const maskerHeight = computed(() => {
    return (props.lineHeight * 2 + 10) * dpr
  })

  const indicatorHeight = computed(() => {
    return props.lineHeight * dpr
  })

  const selectedIndexs = computed({
    get: (): number[] => {
      return props.modelValue.reduce(function (
        total: number[],
        value: unknown,
        columnIndex: number
      ) {
        const columnData = !props.isCascade
          ? props.data[columnIndex]
          : getColumnData(columnIndex, total)

        const itemIndex =
          columnData &&
          columnData.findIndex(
            (item: PropsItem) => item.value === value
          )

        total.push(itemIndex > 0 ? itemIndex : 0)
        return total
      },
      [])
    },
    set: (val: number[]) => {
      if (Array.isArray(val) && val.length > 0) {
        const selectedItems = val.map(
          (itemIndex: number, columnIndex: number) => {
            return pickerData.value[columnIndex]?.[
              itemIndex
            ]
          }
        )

        const selectedValues = selectedItems.map(
          (i: PropsItem) => i?.value
        )
        emit(UPDATE_MODEL_EVENT, selectedValues)
        // emit(CHANGE_EVENT, selectedItems)
      }
    },
  })

  const setWheelsRef = (
    el: Element | ComponentInternalInstance | null
  ) => {
    if (el) {
      wheelsRef.value.push(el as unknown as HTMLElement)
    }
  }

  const createWheel = (
    el: HTMLElement,
    index: number
  ): void => {
    wheelInstance = wheelInstance ? wheelInstance : []
    wheelInstance[index] = new BScroll(el, {
      wheel: {
        selectedIndex:
          (selectedIndexs.value[index] as number) || 0,
        wheelWrapperClass: 'md-picker-view_wheel',
        wheelItemClass: 'md-picker-view_wheel--item',
        wheelDisabledItemClass:
          'md-picker-view_wheel--disabled-item',
      },
      probeType: 3,
    })

    wheelInstance[index].on('scrollEnd', () => {
      const curSelectedIndex =
        (wheelInstance &&
          wheelInstance.map((wheel: BScroll): number =>
            wheel.getSelectedIndex()
          )) ||
        []

      // when destory wheel, not refresh selected indexs and column data
      if (isDestory.value) {
        return
      }
      curWheelIndex.value = index
      if (cacheColumnIndex.value === -1) {
        cacheColumnIndex.value = index
      }
      cacheSelectedIndexs.value = curSelectedIndex
      refreshPickerColumn()
    })
  }

  const initWheel = () => {
    if (!wheelInstance) {
      wheelInstance = []
      for (let i = 0; i < props.cols; i++) {
        wheelsRef.value &&
          createWheel(wheelsRef.value[i], i)
      }
    }
  }

  const getWheelInstance = () => wheelInstance

  /**
   * when change data, refresh wheel
   */
  const refreshWheel = () => {
    wheelInstance &&
      wheelInstance.map((wheel) => {
        wheel.refresh()
      })
  }

  /**
   * reset data and wheel
   */
  const resetWheel = () => {
    resetPickerData()
    nextTick(() => {
      initWheel()
    })
  }

  /**
   * if not keep index, reset wheel to first index
   */
  const resetWheelIndex = (columnIndex: number) => {
    if (props.keepIndex) {
      return
    }
    wheelInstance?.[columnIndex]?.wheelTo(0, 0)
  }

  const destroyWheel = () => {
    isDestory.value = true
    wheelInstance &&
      wheelInstance.map((wheel: BScroll): void => {
        // reset the wrapper class to first index
        wheel.wheelTo(0, 0)

        wheel.destroy()
      })
    wheelInstance = null
    // reset selectedIndexs
    selectedIndexs.value = []
    isDestory.value = false
  }

  const initPickerColumn = (
    initial: boolean,
    columnIndex: number,
    selectedIndexs?: number[]
  ): void => {
    if (!props.isCascade) {
      return
    }
    if (columnIndex >= props.cols) {
      return
    }
    const columnData = getColumnData(
      columnIndex,
      selectedIndexs
    )

    if (columnData) {
      // update the next column data
      pickerData.value.splice(columnIndex, 1, columnData)
    } else {
      // if next column data doesn't exist, set it to []
      while (columnIndex < props.cols) {
        pickerData.value.splice(columnIndex, 1, [])
        columnIndex++
      }
      return
    }

    if (initial) {
      initPickerColumn(
        initial,
        ++columnIndex,
        selectedIndexs
      )
    }
  }

  function getColumnData(
    columnIndex: number,
    selectedIndexs?: number[]
  ) {
    let index = 0
    let columnData = props.data[0]

    while (index < columnIndex) {
      const selectedIndex = selectedIndexs?.[index] || 0
      columnData =
        columnData[selectedIndex] &&
        columnData[selectedIndex].children
      index++
    }

    return columnData
  }

  /**
   * when scrollend, if is cascade, reset all the behind columns to first index
   */
  const refreshPickerColumn = async () => {
    if (props.isCascade) {
      // when scrollend, refresh next column data
      // if the column selected index is 0, refreshWheel doesn't work, update next column data
      do {
        initPickerColumn(
          false,
          curWheelIndex.value + 1,
          cacheSelectedIndexs.value
        )
        curWheelIndex.value++
      } while (
        !cacheSelectedIndexs.value[curWheelIndex.value] &&
        curWheelIndex.value < props.cols - 1
      )

      resetWheelIndex(curWheelIndex.value)

      if (curWheelIndex.value + 1 >= props.cols) {
        onRefreshFinish()
      }
    } else {
      onRefreshFinish()
    }
  }

  /**
   * when finish cascade refresh, emit change and reset user scroll column
   */
  const onRefreshFinish = () => {
    const changedColumnIndex = cacheColumnIndex.value
    const changedItemIndex =
      cacheSelectedIndexs.value[cacheColumnIndex.value]

    emit(
      CHANGE_EVENT,
      changedColumnIndex,
      changedItemIndex,
      pickerData.value[changedColumnIndex]?.[
        changedItemIndex
      ]
    )

    selectedIndexs.value = [...cacheSelectedIndexs.value]
    cacheColumnIndex.value = -1
  }

  /**
   * when init/update picker, reset all column data
   */
  const resetPickerData = () => {
    curWheelIndex.value = -1
    if (props.isCascade) {
      initPickerColumn(
        true,
        curWheelIndex.value + 1,
        selectedIndexs.value
      )
    } else {
      pickerData.value = props.data
    }
  }

  /**
   * check if the item is in invalid values
   */
  const checkInvalid = (
    columnIndex: number,
    item: PropsItem
  ) => {
    const invalidColumnValue =
      props.invalidValue[columnIndex] || []
    return invalidColumnValue.indexOf(item.value) > -1
  }

  const getColumnValues = () => {
    return selectedIndexs.value.map(
      (itemIndex: number, columnIndex: number) => {
        return pickerData.value[columnIndex]?.[itemIndex]
      }
    )
  }

  watch(
    () => props.data,
    async () => {
      destroyWheel()
      resetWheel()
    }
  )

  onBeforeMount(() => {
    resetPickerData()
  })

  onMounted(() => {
    // if the wheels dom have initialized, init wheel
    if (wheelsRef.value?.length) {
      const rect =
        wheelsRef.value[0]?.getBoundingClientRect()
      rect?.width && rect?.height && initWheel()
    }
  })

  onBeforeUpdate(() => {
    wheelsRef.value = []
  })

  onUpdated(() => {
    refreshWheel()
  })

  onBeforeUnmount(() => {
    destroyWheel()
  })

  return {
    maskerHeight,
    indicatorHeight,

    pickerData,
    selectedIndexs,
    setWheelsRef,
    checkInvalid,

    getWheelInstance,
    resetWheel,
    destroyWheel,

    getColumnValues,
  }
}
