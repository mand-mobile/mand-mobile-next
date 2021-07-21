import {
  computed,
  nextTick,
  onMounted,
  ref,
  watch,
  watchEffect,
} from 'vue'
import {
  UPDATE_MODEL_EVENT,
  FOCUS_EVENT,
  BLUR_EVENT,
} from 'mand-mobile/utils'
import { t } from 'mand-mobile/locale'
import { formatValue } from './use-input'

import type {
  ComponentPublicInstance,
  SetupContext,
  ExtractPropTypes,
  PropType,
} from 'vue'

export const fakeInputProps = {
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
  readonly: {
    type: Boolean,
    default: false,
  },
  disabled: {
    type: Boolean,
    default: false,
  },
  excludes: {
    type: [Object, String],
    default: undefined,
  },
  gap: {
    type: Boolean,
    default: false,
  },
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
  okText: {
    type: String,
    default: t('md.number_keyboard.confirm'),
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

export const useFakeInput = (
  props: ExtractPropTypes<typeof fakeInputProps>,
  {
    emit,
  }: SetupContext<
    ('focus' | 'blur' | 'update:modelValue')[]
  >
) => {
  const numberKeyBoardRef =
    ref<ComponentPublicInstance<any> | null>(null)
  const box = computed<HTMLElement | undefined>(
    () => numberKeyBoardRef.value?.$refs.popup.box
  )

  const isFocus = ref(false)
  const isWaiting = ref(false)

  const clickHandler = () => {
    isFocus.value = true
  }

  const blurHandler = () => {
    isFocus.value = false
  }

  watch(isFocus, (val) =>
    val ? emit(FOCUS_EVENT) : emit(BLUR_EVENT)
  )

  const innerValue = ref<number | string>('')
  const displayValue = computed(() => {
    return formatValue(innerValue.value + '', props.type)
  })

  watchEffect(() => {
    innerValue.value = `${props.modelValue}`.replace(
      /\s|,/g,
      ''
    )
  })

  watch(innerValue, (val) => {
    emit(UPDATE_MODEL_EVENT, val)
  })

  const inputHandler = (val: string) => {
    if (`${innerValue.value}`.length < props.maxlength) {
      innerValue.value += val + ''
      if (!displayValue.value.length) {
        nextTick(() => (innerValue.value = ''))
      }
    }
  }

  const deleteHandler = () => {
    innerValue.value = `${innerValue.value}`.slice(0, -1)
  }

  return {
    isFocus,
    isWaiting,
    clickHandler,
    blurHandler,
    inputHandler,
    deleteHandler,
    numberKeyBoardRef,
    box,
    innerValue,
    displayValue,
  }
}
