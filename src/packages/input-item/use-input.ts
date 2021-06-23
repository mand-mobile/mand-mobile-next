import { computed, ref, watchEffect } from 'vue'
import {
  UPDATE_MODEL_EVENT,
  FOCUS_EVENT,
  BLUR_EVENT,
  randomId,
} from 'mand-mobile/utils'

import type {
  PropType,
  ExtractPropTypes,
  SetupContext,
} from 'vue'

export const inputProps = {
  type: {
    type: String as PropType<
      | 'text'
      | 'bankCard'
      | 'password'
      | 'phone'
      | 'money'
      | 'digit'
      | 'tel'
      | 'email'
      | string
    >,
    default: 'text',
  },
  previewType: {
    type: String,
    default: '',
  },
  name: {
    type: [String, Number],
    default: () => {
      return randomId('input-item')
    },
  },
  title: {
    type: String,
    default: '',
  },
  brief: {
    type: String,
    default: '',
  },
  modelValue: {
    type: [String, Number],
    default: '',
  },
  placeholder: {
    type: String,
    default: '',
  },
  maxlength: {
    type: Number,
    default: Infinity,
  },
  size: {
    type: String as PropType<'large' | 'normal'>,
    default: 'normal',
  },
  align: {
    type: String as PropType<'left' | 'center' | 'right'>,
    default: 'left',
  },
  error: {
    type: String,
    default: '',
  },
  readonly: {
    type: Boolean,
    default: false,
  },
  disabled: {
    type: Boolean,
    default: false,
  },
  solid: {
    type: Boolean,
    default: true,
  },
  clearable: {
    type: Boolean,
    default: false,
  },
  isVirtualKeyboard: {
    type: Boolean,
    default: false,
  },
  virtualKeyboardDisorder: {
    type: Boolean,
  },
  virtualKeyboardOkText: {
    type: String,
    default: '',
  },
  virtualKeyboardVm: {
    type: [Object, String],
    default: undefined,
  },
  isTitleLatent: {
    type: Boolean,
    default: false,
  },
  isFormative: {
    type: Boolean,
    default: false,
  },
  isHighlight: {
    type: Boolean,
    default: false,
  },
  isAmount: {
    type: Boolean,
    default: false,
  },
  formation: {
    type: Function as PropType<(val: string) => string>,
    default: undefined,
  },
  okText: {
    type: String,
    default: '确认',
  },
  hideDot: {
    type: Boolean,
    default: false,
  },
  disorder: {
    type: Boolean,
    default: false,
  },
}

export const useInput = (
  props: ExtractPropTypes<typeof inputProps>,
  {
    emit,
  }: SetupContext<
    ('update:modelValue' | 'focus' | 'blur')[]
  >
) => {
  const innerValue = ref('')
  const nativeInputRef = ref<HTMLInputElement | null>(null)

  const nativeInputHandler = (ev: Event) => {
    const curValue = (ev.target as HTMLInputElement).value
    const formatterValue = formatValue(
      curValue ? '' + curValue : '',
      props.type || 'text',
      props.formation
    )

    innerValue.value = isNativeInputFormative.value
      ? formatterValue
      : curValue
    if (nativeInputRef.value)
      nativeInputRef.value.value =
        isNativeInputFormative.value
          ? formatterValue
          : curValue

    emit(
      UPDATE_MODEL_EVENT,
      isNativeInputFormative.value
        ? formatterValue.replace(/\s|,/g, '')
        : curValue
    )
  }

  watchEffect(() => {
    innerValue.value = formatValue(
      props.modelValue ? '' + props.modelValue : '',
      props.type || 'text',
      props.formation
    )
  })

  const isNativeInputFormative = computed(
    () =>
      props.isFormative ||
      props.type === 'bankCard' ||
      props.type === 'phone' ||
      props.type === 'money' ||
      props.type === 'digit'
  )

  const nativeInputMaxLength = computed(() =>
    isNativeInputFormative.value ? '' : props.maxlength
  )

  /**
   * faker input
   */
  const fakeInputHandler = (
    val: string | number | undefined
  ) => {
    innerValue.value = val ? val + '' : ''
    emit(UPDATE_MODEL_EVENT, val)
  }

  return {
    innerValue,
    nativeInputRef,

    nativeInputHandler,
    fakeInputHandler,

    nativeInputMaxLength,
  }
}

export const useInputDisplay = (
  props: ExtractPropTypes<typeof inputProps>,
  {
    emit,
    slots,
  }: SetupContext<
    ('update:modelValue' | 'focus' | 'blur')[]
  >
) => {
  const nativeInputType = computed(() => {
    let inputType = props.type
    if (
      inputType === 'bankCard' ||
      inputType === 'phone' ||
      inputType === 'digit'
    ) {
      inputType = 'tel'
    } else if (inputType === 'money') {
      inputType = 'text'
    }
    return inputType
  })

  const isNativeInputFocus = ref(false)
  const focusHandler = () => {
    isNativeInputFocus.value = true
    emit(FOCUS_EVENT)
  }
  const blurHandler = () => {
    isNativeInputFocus.value = false
    emit(BLUR_EVENT)
  }

  const isInputError = computed(
    () => !!slots.error || props.error !== ''
  )
  const isInputBrief = computed(
    () => !!slots.brief || props.brief !== ''
  )

  return {
    nativeInputType,

    isNativeInputFocus,
    focusHandler,
    blurHandler,

    isInputError,
    isInputBrief,
  }
}

export function formatValue(
  value: string,
  type: string,
  formation?: (val: string) => string
) {
  if (formation) {
    return formation(value)
  }
  let formatValue = ''

  switch (type) {
    case 'bankCard':
      formatValue = formatBankCard(value).replace(/\./g, '')
      break
    case 'phone':
      formatValue = formatPhoneNumber(value).replace(
        /\./g,
        ''
      )
      break
    case 'digit':
      formatValue = value.replace(/[\D\.]/g, '')
      break
    case 'money':
      formatValue = formatMoney(value)
      break
    default:
      formatValue = value
      break
  }

  return formatValue
}

function formatBankCard(value: string) {
  if (!value) return ''
  value = value.replace(/[\sA-Za-z]/g, '')

  const fourDigReg = /\d{4}/g
  const prefixValue = value.match(fourDigReg)
    ? value.match(fourDigReg)?.join(' ').trim()
    : ''
  return (
    prefixValue +
    ' ' +
    value.replace(/\d{4}/g, '')
  ).trim()
}

function formatPhoneNumber(value: string) {
  if (!value) return ''
  value = value.replace(/[\sA-Za-z]/g, '')

  const threeDigReg = /\d{3}/

  const prefixValue = value.match(threeDigReg)
    ? value.match(threeDigReg)?.join(' ').trim()
    : ''
  if (!prefixValue) {
    return value
  } else {
    const rest = value.replace(prefixValue, '')
    return (prefixValue + ' ' + formatBankCard(rest)).trim()
  }
}

export function formatMoney(value: string, symbol = ',') {
  const reg = /(?!^)(?=(\d{3})+$)/g
  return value.replace(reg, symbol)
}
