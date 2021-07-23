import { ref, watch, computed, onMounted } from 'vue'
import type { ExtractPropTypes, SetupContext } from 'vue'
import {
  warn,
  UPDATE_MODEL_EVENT,
  CHANGE_EVENT,
  MathSign,
} from 'mand-mobile-next/utils'

const INCREASE_EVENT = 'increase'
const DECREASE_EVENT = 'decrease'

export const stepperProps = {
  defaultValue: {
    type: [Number, String],
    default: 0,
  },
  modelValue: {
    type: [Number, String],
    default: 0,
  },
  step: {
    type: [Number, String],
    default: 1,
  },
  min: {
    type: [Number, String],
    default: -Number.MAX_VALUE,
  },
  max: {
    type: [Number, String],
    default: Number.MAX_VALUE,
  },
  disabled: {
    type: Boolean,
    default: false,
  },
  readOnly: {
    type: Boolean,
    default: false,
  },
  isInteger: {
    type: Boolean,
    default: false,
  },
}
function getDecimalNum(num: number) {
  try {
    return num.toString().split('.')[1].length
  } catch (e) {
    return 0
  }
}

function accAdd(num1: number, num2: number) {
  const r1 = getDecimalNum(num1)
  const r2 = getDecimalNum(num2)
  const m = Math.pow(10, Math.max(r1, r2))
  return +((num1 * m + num2 * m) / m)
}

function subtr(num1: number, num2: number) {
  const r1 = getDecimalNum(num1)
  const r2 = getDecimalNum(num2)
  const m = Math.pow(10, Math.max(r1, r2))
  const n = r1 >= r2 ? r1 : r2
  return +((num1 * m - num2 * m) / m).toFixed(n)
}

export const useStepper = (
  props: ExtractPropTypes<typeof stepperProps>,
  { emit }: SetupContext<string[]>
) => {
  const isMin = ref(false)
  const isMax = ref(false)
  const isEditing = ref(false)
  const currentNum = ref(0)

  const contentLength = computed(() => {
    if (!props.modelValue) {
      return 2
    }

    const length = props.modelValue.toString().length
    return length > 2 ? length : 2
  })

  // method
  const reduce = () => {
    if (props.disabled || isMin.value) {
      return
    }
    currentNum.value = subtr(currentNum.value, +props.step)
    onChange()
  }
  const add = () => {
    if (props.disabled || isMax.value) {
      return
    }

    currentNum.value = accAdd(currentNum.value, +props.step)
    onChange()
  }

  const onFocus = () => {
    isEditing.value = true
  }

  const onChange = () => {
    isEditing.value = false
    currentNum.value = getCurrentNum(currentNum.value)
  }

  const formatNum = (value: string | number) => {
    // 因最负数的情况 不能去除负号-
    value = String(value).replace(/[^0-9.-]|^\./g, '')

    // 判断是否为 正数 负数、0
    if (String(MathSign(value)) === 'NaN') {
      value = ''
    }

    return value === ''
      ? 0
      : props.isInteger
      ? Math.floor(+value)
      : +value
  }

  const checkStatus = () => {
    isMin.value = currentNum.value <= props.min
    isMax.value = currentNum.value >= props.max
  }

  const checkMinMax = () => {
    if (props.min > props.max) {
      warn('[md-vue-stepper] minNum is larger than maxNum')
    }
    return props.max > props.min
  }

  const getCurrentNum = (value: string | number) => {
    return Math.max(
      Math.min(+props.max, formatNum(value)),
      +props.min
    )
  }

  const onInput = (event: Event) => {
    const { value } = event.target as HTMLInputElement
    const formatted = formatNum(value)
    currentNum.value = formatted

    if (+value !== formatted) {
      ;(<HTMLInputElement>event.target).value =
        '' + formatted
    }

    emit(UPDATE_MODEL_EVENT, formatted)
  }

  watch(
    () => props.defaultValue,
    (val) => {
      currentNum.value = getCurrentNum(+val)
    }
  )

  watch(
    () => props.modelValue,
    (val) => {
      if (isEditing.value) {
        return
      }
      currentNum.value = getCurrentNum(+val)
    }
  )

  watch(
    () => props.min,
    (val) => {
      if (currentNum.value < +val) {
        currentNum.value = +val
      }
      checkStatus()
    }
  )

  watch(
    () => props.max,
    (val) => {
      if (currentNum.value > +val) {
        currentNum.value = +val
      }
      checkStatus()
    }
  )

  watch(
    currentNum,
    (newVal, oldVal = 0) => {
      checkStatus()
      if (newVal != +props.modelValue) {
        emit(UPDATE_MODEL_EVENT, newVal)
        emit(CHANGE_EVENT, newVal)
      }
      const diff = newVal - oldVal
      // judge the event of operation
      if (diff > 0) {
        emit(INCREASE_EVENT, diff)
      } else if (diff < 0) {
        emit(DECREASE_EVENT, Math.abs(diff))
      }
    },
    {
      immediate: true,
    }
  )
  onMounted(() => {
    // verify that the minimum value is less than the maximum value
    checkMinMax()
    const val = props.modelValue ?? props.defaultValue
    currentNum.value = getCurrentNum(+val)
    checkStatus()
  })

  return {
    isMin,
    isMax,
    isEditing,
    currentNum,
    contentLength,
    add,
    onChange,
    reduce,
    formatNum,
    getCurrentNum,
    checkStatus,
    checkMinMax,
    onInput,
    onFocus,
  }
}

export const emits = [
  UPDATE_MODEL_EVENT,
  CHANGE_EVENT,
  INCREASE_EVENT,
  DECREASE_EVENT,
]
