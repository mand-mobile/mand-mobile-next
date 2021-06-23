import { onBeforeMount, ref, computed } from 'vue'
import {
  transformDate,
  toObject,
  warn,
  deepEquals,
  isValidDate,
  UPDATE_MODEL_EVENT,
  UPDATE_VISIBLE_EVENT,
  HIDE_EVENT,
  SHOW_EVENT,
  CHANGE_EVENT,
  CONFIRM_EVENT,
  CANCEL_EVENT,
} from 'mand-mobile/utils'

import { t } from 'mand-mobile/locale'

import { popupProps, usePopup } from 'mand-mobile/picker'

import type {
  ExtractPropTypes,
  PropType,
  SetupContext,
} from 'vue'

type datePickerType =
  | 'date'
  | 'time'
  | 'datetime'
  | 'custom'

type customType =
  | 'yyyy'
  | 'MM'
  | 'dd'
  | 'HH'
  | 'hh'
  | 'mm'
  | 'ss'

export const TYPE_FORMAT: Record<string, string> = {
  yyyy: 'Year',
  MM: 'Month',
  dd: 'Date',
  HH: 'Hour',
  hh: 'Hour',
  mm: 'Minute',
  ss: 'Second',
}

export const TYPE_METHODS: Record<string, string> = {
  Year: 'getFullYear',
  Month: 'getMonth',
  Date: 'getDate',
  Hour: 'getHours',
  Minute: 'getMinutes',
  Second: 'getSeconds',
}

export const customTypeList: customType[] = [
  'yyyy',
  'MM',
  'dd',
  'HH',
  'hh',
  'mm',
  'ss',
]

export const TYPE_COLUMN: Record<string, Array<string>> = {
  date: ['yyyy', 'MM', 'dd'],
  time: ['hh', 'mm', 'ss'],
  datetime: ['yyyy', 'MM', 'dd', 'hh', 'mm'],
}

export const emits = [
  UPDATE_MODEL_EVENT,
  UPDATE_VISIBLE_EVENT,
  HIDE_EVENT,
  SHOW_EVENT,
  CHANGE_EVENT,
  CONFIRM_EVENT,
  CANCEL_EVENT,
]

export const TYPE_FORMAT_INVERSE: Record<string, string> =
  toObject(
    Object.keys(TYPE_FORMAT).map((item: string) => {
      return {
        [TYPE_FORMAT[item]]: item,
      }
    })
  )

export const datePickerProps = {
  modelValue: {
    type: [Date, Array],
    default: [],
  },
  isView: {
    type: Boolean,
    default: false,
  },
  type: {
    type: String as PropType<datePickerType>,
    default: 'date',
  },
  customTypes: {
    type: Array as PropType<Array<customType>>,
    default: [],
  },
  minDate: {
    type: [Date, String],
  },
  maxDate: {
    type: [Date, String],
  },
  unitText: {
    type: Array as PropType<Array<string>>,
    default: [
      t('md.date_picker.year'),
      t('md.date_picker.month'),
      t('md.date_picker.day'),
      t('md.date_picker.hour'),
      t('md.date_picker.minute'),
      t('md.date_picker.second'),
    ],
  },
  todayText: {
    type: String,
    default: '',
  },
  textRender: {
    type: Function,
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

export const useDatePicker = (
  props: ExtractPropTypes<
    typeof popupProps & typeof datePickerProps
  >,
  context: SetupContext<any[]>
) => {
  const pickerData = ref<any[]>([])

  const cols = computed(() => {
    return pickerData.value.length
  })

  const curChangedIndex = ref(-1)

  const columnTypes = computed(() => {
    return props.type === 'custom'
      ? props.customTypes
      : TYPE_COLUMN[props.type]
  })

  /**
   * ['dd', 'MM', 'yyyy'] => [2,1,0,-1,-1,-1,-1]
   */
  const columnTypesIndexs = computed(() => {
    return customTypeList.map((type: customType) => {
      return columnTypes.value.indexOf(type)
    })
  })

  const { emit } = context

  const {
    popupShow,
    innerValue,
    pickerView,
    onHide,
    onShow,
    cancelHandler,
    confirmHandler,
  } = usePopup(props, context)

  const dateValues = computed({
    get: () => {
      return innerValue.value
    },
    set: (val) => {
      if (
        innerValue.value instanceof Date &&
        props.type !== 'time'
      ) {
        const date = toDate(columnTypes.value, val as any)
        innerValue.value = new Date(date)
        // emit(UPDATE_MODEL_EVENT, new Date(date))
      } else {
        innerValue.value = val
        // emit(UPDATE_MODEL_EVENT, val)
      }
    },
  })

  const selectedValues = computed({
    get: () => {
      if (innerValue.value instanceof Date) {
        if (props.type === 'time') {
          warn(
            'v-model should be array when date picker type is time'
          )
          return
        }

        return columnTypes.value.map((column) => {
          const methodName =
            TYPE_METHODS[TYPE_FORMAT[column]]
          let columnValue = innerValue.value[methodName]()

          if (column === 'MM') {
            columnValue += 1
          }
          return columnValue
        })
      } else if (Array.isArray(innerValue.value)) {
        return innerValue.value
      } else {
        return []
      }
    },
    set: (val) => {
      initColumnData(curChangedIndex.value, val as number[])
    },
  })

  const columnDataGenerator = ref<any>([])

  const currentDate = new Date()
  const minDate = computed<Date>(() => {
    const date =
      props.minDate && transformDate(props.minDate)

    if (props.type !== 'time' && !isValidDate(date)) {
      warn('Param minDate has invalid value.')
      return currentDate
    }
    return date as Date
  })
  const maxDate = computed<Date>(() => {
    const date =
      props.maxDate && transformDate(props.maxDate)

    if (props.type !== 'time' && !isValidDate(date)) {
      warn('Param maxDate has invalid value.')
      return currentDate
    }
    return date as Date
  })

  const initPicker = () => {
    if (
      minDate.value?.getTime() >= maxDate.value?.getTime()
    ) {
      warn(
        'Param minDate Year should be earlier than Param maxDate.'
      )
      return
    }
    initPickerColumn()
  }

  const initPickerColumn = () => {
    resetPickerColumn()
    initColumnDataGenerator()
    initColumnData(-1)
  }

  const resetPickerColumn = () => {
    pickerData.value = []
    columnDataGenerator.value = []
  }

  const initColumnDataGenerator = () => {
    switch (props.type) {
      case 'date':
      case 'time':
      case 'datetime':
        initColumnDataGeneratorForCustom(
          TYPE_COLUMN[props.type]
        )
        break
      default:
        initColumnDataGeneratorForCustom(props.customTypes)
        break
    }
  }

  const initColumnData = (
    changedColumnIndex: number,
    changedColumnValues?: number[]
  ) => {
    const newPickerData =
      [...(pickerData.value as any[])] || []
    const newSelectedValues: any = changedColumnValues
      ? [...changedColumnValues]
      : selectedValues.value

    const dateTypeIndex =
      changedColumnIndex > -1
        ? columnTypesIndexs.value[changedColumnIndex]
        : changedColumnIndex

    columnTypesIndexs.value.map(
      (columnIndex: number, index: number) => {
        if (columnIndex < 0) {
          return
        }

        if (index > dateTypeIndex) {
          const generator: any =
            columnDataGenerator.value[columnIndex]

          const columnDataGeneratorParams =
            getGeneratorArguments(newSelectedValues)

          // Generator colume data with columnDataGeneratorParams
          const curColumnData = generator
            ? generator(
                columnIndex,
                columnDataGeneratorParams
              )
            : ''

          // When change column data, some date doesn't exist between minDate and maxDate
          // reset cur selected value to first item
          if (
            newSelectedValues[columnIndex] >
              curColumnData[curColumnData.length - 1]
                .value ||
            newSelectedValues[columnIndex] <
              curColumnData[0].value
          ) {
            newSelectedValues[columnIndex] =
              curColumnData[0].value
          }

          newPickerData[columnIndex] = [...curColumnData]
        }
      }
    )

    if (
      !deepEquals(selectedValues.value, newSelectedValues)
    ) {
      dateValues.value = newSelectedValues
    }

    if (!deepEquals(pickerData.value, newPickerData)) {
      pickerData.value = newPickerData
    }
  }

  const onPickerChange = (
    columnIndex: number,
    itemIndex: number,
    item: Record<string, any>
  ) => {
    emit(CHANGE_EVENT, columnIndex, itemIndex, item)
    curChangedIndex.value = columnIndex
  }

  onBeforeMount(() => {
    initPicker()
  })

  return {
    pickerData,
    cols,
    selectedValues,
    onPickerChange,

    popupShow,
    innerValue,
    pickerView,
    onHide,
    onShow,
    cancelHandler,
    confirmHandler,
  }

  function initColumnDataGeneratorForCustom(
    customTypes: any
  ) {
    customTypes.forEach((type: string) => {
      type = TYPE_FORMAT[type] || type

      switch (type) {
        case 'Year':
          columnDataGenerator.value.push(generateYearData)
          break
        case 'Month':
          columnDataGenerator.value.push(generateMonthData)
          break
        case 'Date':
          columnDataGenerator.value.push(generateDateData)
          break
        case 'Hour':
          columnDataGenerator.value.push(generateHourData)
          break
        case 'Minute':
          columnDataGenerator.value.push(generateMinuteData)
          break
        case 'Second':
          columnDataGenerator.value.push(generateSecondData)
          break
      }
    })
  }

  function generateYearData(columnIndex: number) {
    const start = minDate.value
      ? minDate.value.getFullYear()
      : currentDate.getFullYear() - 20
    const end = maxDate.value
      ? maxDate.value.getFullYear()
      : currentDate.getFullYear() + 20

    return generateData(
      start,
      end,
      'Year',
      props.unitText[columnIndex],
      1
    )
  }

  function generateMonthData(
    columnIndex: number,
    curSelected: Record<string, number>
  ) {
    let start = 1,
      end = 12

    if (
      minDate.value &&
      isDateTimeEqual(minDate.value, curSelected.Year)
    ) {
      start = minDate.value.getMonth() + 1
    }

    if (
      maxDate.value &&
      isDateTimeEqual(maxDate.value, curSelected.Year)
    ) {
      end = maxDate.value.getMonth() + 1
    }

    return generateData(
      start,
      end,
      'Month',
      props.unitText[columnIndex] || '',
      1
    )
  }

  function generateDateData(
    columnIndex: number,
    curSelected: Record<string, number>
  ) {
    let start = 1,
      end = new Date(
        curSelected.Year,
        curSelected.Month,
        0
      ).getDate()

    if (
      minDate.value &&
      isDateTimeEqual(
        minDate.value,
        curSelected.Year,
        curSelected.Month
      )
    ) {
      start = minDate.value.getDate()
    }

    if (
      maxDate.value &&
      isDateTimeEqual(
        maxDate.value,
        curSelected.Year,
        curSelected.Month
      )
    ) {
      end = maxDate.value.getDate()
    }

    const dateData = generateData(
      start,
      end,
      'Date',
      props.unitText[columnIndex] || '',
      1
    )

    // display today text
    if (
      props.todayText &&
      isDateTimeEqual(
        currentDate,
        curSelected.Year,
        curSelected.Month
      )
    ) {
      const currentDateIndex = currentDate.getDate() - start
      const currentDateText =
        dateData[currentDateIndex].text

      dateData[currentDateIndex].text =
        props.todayText.replace('&', currentDateText)
    }

    return dateData
  }

  function generateHourData(
    columnIndex: number,
    curSelected: Record<string, number>
  ) {
    let start = 0,
      end = 23

    if (props.type !== 'time') {
      if (
        minDate.value &&
        isDateTimeEqual(
          minDate.value,
          curSelected.Year,
          curSelected.Month,
          curSelected.Date
        )
      ) {
        start = minDate.value.getHours()
      }

      if (
        maxDate.value &&
        isDateTimeEqual(
          maxDate.value,
          curSelected.Year,
          curSelected.Month,
          curSelected.Date
        )
      ) {
        end = maxDate.value.getHours()
      }

      /* istanbul ignore if */
      if (end < start) {
        end = 23
      }
    }

    return generateData(
      start,
      end,
      'Hour',
      props.unitText[columnIndex] || '',
      1
    )
  }

  function generateMinuteData(
    columnIndex: number,
    curSelected: Record<string, number>
  ) {
    let start = 0,
      end = 59

    if (props.type !== 'time') {
      if (
        minDate.value &&
        isDateTimeEqual(
          minDate.value,
          curSelected.Year,
          curSelected.Month,
          curSelected.Date,
          curSelected.Hour
        )
      ) {
        start = minDate.value.getMinutes()
      }

      if (
        maxDate.value &&
        isDateTimeEqual(
          maxDate.value,
          curSelected.Year,
          curSelected.Month,
          curSelected.Date,
          curSelected.Hour
        )
      ) {
        end = maxDate.value.getMinutes()
      }
    }

    return generateData(
      start,
      end,
      'Minute',
      props.unitText[columnIndex] || '',
      1
    )
  }

  function generateSecondData(
    columnIndex: number,
    curSelected: Record<string, number>
  ) {
    let start = 0,
      end = 59

    if (props.type !== 'time') {
      if (
        minDate.value &&
        isDateTimeEqual(
          minDate.value,
          curSelected.Year,
          curSelected.Month,
          curSelected.Date,
          curSelected.Hour,
          curSelected.Minute
        )
      ) {
        start = minDate.value.getSeconds()
      }

      if (
        maxDate.value &&
        isDateTimeEqual(
          maxDate.value,
          curSelected.Year,
          curSelected.Month,
          curSelected.Date,
          curSelected.Hour,
          curSelected.Minute
        )
      ) {
        end = maxDate.value.getSeconds()
      }
    }

    return generateData(
      start,
      end,
      'Second',
      props.unitText[columnIndex],
      1
    )
  }

  function generateData(
    from: number,
    to: number,
    type: string,
    unit = '',
    step = 1
  ) {
    let count = from
    let text
    const data = []

    while (count <= to) {
      props.textRender &&
        (text = props.textRender(
          TYPE_FORMAT_INVERSE[type],
          count
        ))
      data.push({
        text: text || `${count}${unit}`,
        value: count,
        typeFormat: TYPE_FORMAT_INVERSE[type] || type,
        type,
      })
      count += step
    }

    return data
  }

  function getGeneratorArguments(selectedValues: number[]) {
    const defaultDate = getDefaultDate()
    const args: any = {
      Year: defaultDate.getFullYear(),
      Month: defaultDate.getMonth() + 1,
      Date: defaultDate.getDate(),
      Hour: defaultDate.getHours(),
      Minute: defaultDate.getMinutes(),
      Second: defaultDate.getSeconds(),
    }
    selectedValues &&
      selectedValues.map(
        (selectedValue: number, index: number) => {
          const columnType = columnTypes.value[index]
          args[TYPE_FORMAT[columnType]] = selectedValue
        }
      )

    return args
  }

  function getDefaultDate() {
    const defaultDate = props.modelValue
    if (!(defaultDate instanceof Date)) {
      return minDate.value || maxDate.value || new Date()
    }

    if (
      minDate.value &&
      defaultDate.getTime() < minDate.value.getTime()
    ) {
      return minDate.value
    }

    if (
      maxDate.value &&
      defaultDate.getTime() > maxDate.value.getTime()
    ) {
      return maxDate.value
    }

    return defaultDate
  }

  /**
   * Determine whether year, month, date, etc of
   * the current date are equal to the given value
   * @params Date
   * @params year, month, date ...
   */
  function isDateTimeEqual(date: any, ...args: number[]) {
    const methods = Object.keys(TYPE_METHODS).map((key) => {
      return TYPE_METHODS[key]
    })

    let res = true

    for (let i = 0; i < args.length; i++) {
      const methodName = methods[i]
      const curVal =
        date[methodName]() +
        Number(methodName === 'getMonth')
      const targetVal = +args[i]

      if (curVal !== targetVal) {
        res = false
        break
      }
    }

    return res
  }

  /**
   * transform the selected array to date string
   * @param columnTypes example: ['yyyy','MM','dd']
   * @param columnValues example: [2021, 10, 1 ]
   * @result '2021/10/1 00:00:00'
   */
  function toDate(
    columnTypes: Array<string>,
    columnValues: Array<string | number>
  ) {
    // iOS can't transform the yyyy-MM-dd format, the separator / works both for Andriod and iOS
    let format = 'yyyy/MM/dd hh:mm:ss'

    columnValues.forEach(
      (
        columnValue: string | number,
        columnIndex: number
      ) => {
        /* istanbul ignore if */
        if (!columnValue) {
          return
        }

        if (columnValue < 10) {
          columnValue = '0' + columnValue
        }

        format = format.replace('HH', 'hh') // deal with HH as hh
        format = format.replace(
          columnTypes[columnIndex],
          columnValue.toString()
        )
      }
    )
    customTypeList.map((type: string) => {
      format = format.replace(type, '0'.repeat(type.length))
    })

    return format
  }
}
