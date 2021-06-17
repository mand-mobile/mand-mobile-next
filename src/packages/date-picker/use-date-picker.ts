import {
  onBeforeMount,
  ref,
  computed,
  watch,
  useContext,
  ComponentPublicInstance,
} from 'vue'
import {
  transformDate,
  toObject,
  warn,
  UPDATE_MODEL_EVENT,
  CHANGE_EVENT,
} from 'mand-mobile/utils'

import type { ExtractPropTypes, PropType } from 'vue'

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
    type: [Date, Array as PropType<Array<string | number>>],
    // default: [],
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
    default: ['年', '月', '日', '时', '分', '秒'],
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
  props: ExtractPropTypes<typeof datePickerProps>
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

  const pickerRef =
    ref<ComponentPublicInstance<{
      getColumnIndexs: (all?: boolean) => void
    }> | null>(null)

  const { emit } = useContext()

  const selectedValues = computed({
    get: () => {
      if (props.modelValue instanceof Date) {
        if (props.type === 'time') {
          warn(
            'v-model should be array when date picker type is time'
          )
          return
        }

        return columnTypes.value.map((column) => {
          const methodName =
            TYPE_METHODS[TYPE_FORMAT[column]]
          let columnValue = props.modelValue[methodName]()

          if (column === 'MM') {
            columnValue += 1
          }
          return columnValue
        })
      } else {
        return props.modelValue || []
      }
    },
    set: (val) => {
      if (
        props.modelValue instanceof Date &&
        props.type !== 'time'
      ) {
        const date = toDate(columnTypes.value, val as any)
        emit(UPDATE_MODEL_EVENT, new Date(date))
      } else {
        emit(UPDATE_MODEL_EVENT, val)
      }
    },
  })

  watch(selectedValues, (val, oldVal) => {
    if (!(JSON.stringify(val) === JSON.stringify(oldVal))) {
      if (curChangedIndex.value < cols.value) {
        initColumnData(curChangedIndex.value)
      }
    }
  })

  const columnDataGenerator = ref([])

  const currentDate = new Date()
  const minDate = computed(() => {
    return props.minDate && transformDate(props.minDate)
  })
  const maxDate = computed(() => {
    return props.maxDate && transformDate(props.maxDate)
  })

  const initPicker = () => {
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

  const initColumnData = (changedColumnIndex: number) => {
    const newPickerData = (pickerData.value as any[]) || []
    const newSelectedValues =
      (selectedValues.value as number[]) || []

    const columnDataGeneratorParams =
      getGeneratorArguments()

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

          // Generator colume data with columnDataGeneratorParams
          const curColumnData = generator
            ? generator.apply(this, [
                columnIndex,
                columnDataGeneratorParams,
              ])
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

          newPickerData[columnIndex] = curColumnData
        }
      }
    )

    selectedValues.value = newSelectedValues
    pickerData.value = newPickerData
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
    pickerRef,
    pickerData,
    cols,
    selectedValues,
    onPickerChange,
  }

  function initColumnDataGeneratorForCustom(
    customTypes: any
  ) {
    customTypes.forEach((type: string) => {
      type = TYPE_FORMAT[type] || type
      columnDataGenerator.value.push(
        eval(`generate${type}Data`)
      )
    })
  }

  function generateYearData(columnIndex: number) {
    const start = minDate.value
      ? minDate.value.getFullYear()
      : currentDate.getFullYear() - 20
    const end = maxDate.value
      ? maxDate.value.getFullYear()
      : currentDate.getFullYear() + 20

    /* istanbul ignore if */
    if (start > end) {
      warn('MinDate Year should be earlier than MaxDate')
      return
    }
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
      /* istanbul ignore if */
      if (start > end) {
        warn('MinDate Hour should be earlier than MaxDate')
        return
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
    const args = getGeneratorArguments()
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
    const args = getGeneratorArguments()
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

  function getGeneratorArguments() {
    const defaultDate = getDefaultDate()
    const args = {
      Year: defaultDate.getFullYear(),
      Month: defaultDate.getMonth() + 1,
      Date: defaultDate.getDate(),
      Hour: defaultDate.getHours(),
      Minute: defaultDate.getMinutes(),
      Second: defaultDate.getSeconds(),
    }
    selectedValues.value &&
      selectedValues.value.map(
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
  function isDateTimeEqual(date: Date, ...args: number[]) {
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

  function toDate(
    columnTypes: Array<string>,
    columnValues: Array<string | number>
  ) {
    let format = 'yyyy-MM-dd hh:mm:ss'

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
