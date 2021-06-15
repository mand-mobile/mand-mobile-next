import {
  ref,
  computed,
  onMounted,
  watch,
  useContext,
  nextTick,
} from 'vue'
import {
  UPDATE_MODEL_EVENT,
  CHANGE_EVENT,
  FOCUS_EVENT,
  BLUR_EVENT,
  KEYUP,
  KEYDOWN,
  noop,
  randomId,
} from 'mand-mobile/utils'
import type { ExtractPropTypes, Ref } from 'vue'
export const textareaItemProps = {
  title: {
    type: String,
    default: '',
  },
  name: {
    type: [String, Number],
    default: () => {
      return randomId('input-item')
    },
  },
  placeholder: {
    type: String,
    default: '',
  },
  maxLength: {
    type: [String, Number],
    default: '',
  },
  maxHeight: {
    type: Number,
    default: 0,
  },
  solid: {
    type: Boolean,
    default: true,
  },
  readonly: {
    type: Boolean,
    default: false,
  },
  disabled: {
    type: Boolean,
    default: false,
  },
  clearable: {
    type: Boolean,
    default: false,
  },
  rows: {
    type: [String, Number],
    default: '3',
  },
  autosize: {
    type: Boolean,
    default: false,
  },
  error: {
    type: String,
    defalut: '',
  },
  formation: {
    type: Function,
    default: noop,
  },
  modelValue: {
    type: String,
    default: '',
  },
}
export const emits = [
  UPDATE_MODEL_EVENT,
  CHANGE_EVENT,
  BLUR_EVENT,
  FOCUS_EVENT,
  KEYUP,
  KEYDOWN,
]
export const useTextareaItem = (
  props: ExtractPropTypes<typeof textareaItemProps>
) => {
  const inputValue = ref(props.modelValue)

  const isDisabled = computed(() => {
    return props.disabled
  })

  const errorInfo = computed(() => {
    return props.error
  })

  const isInputEmpty = computed(() => {
    return inputValue.value === ''
  })

  const { emit } = useContext()
  watch(
    () => inputValue.value,
    (val) => {
      emit(UPDATE_MODEL_EVENT, val)
      emit(CHANGE_EVENT, val)
    }
  )

  watch(
    () => props.modelValue,
    (val) => {
      inputValue.value = val
      nextTick(() => {
        resizeTextarea()
      })
    }
  )

  watch(
    () => props.maxHeight,
    (val) => {
      maxHeightInner.value = val
      resizeTextarea()
    }
  )

  const onInput = (event: Event) => {
    const { value } = event.target as HTMLInputElement
    inputValue.value = formateValue(value, props).value
    resizeTextarea()
  }
  const clearInput = () => {
    inputValue.value = ''
    nextTick(() => {
      resizeTextarea()
    })
    focus()
  }

  const isInputFocus = ref(false)
  const onBlur = () => {
    setTimeout(() => {
      isInputFocus.value = false
      emit(BLUR_EVENT)
    }, 100)
  }
  const onFocus = () => {
    isInputFocus.value = true
    emit(FOCUS_EVENT)
  }
  // clearInput auto focus
  const focus = () => {
    textarea.value && textarea.value.focus()
    setTimeout(() => {
      isInputFocus.value = true
    }, 200)
  }

  const onKeyup = (event: Event) => {
    emit(KEYUP, event)
  }
  const onKeydown = (event: Event) => {
    emit(KEYDOWN, event)
  }

  const textarea = ref<HTMLElement | null>(null)
  const maxHeightInner = ref<number>(props.maxHeight)
  const resizeTextarea = () => {
    if (!textarea.value) return
    calcTextareaHeight(textarea.value, maxHeightInner)
  }

  onMounted(() => {
    resizeTextarea()
  })

  return {
    inputValue,
    isDisabled,
    errorInfo,
    isInputEmpty,

    onInput,
    clearInput,

    onFocus,
    onBlur,
    isInputFocus,

    onKeyup,
    onKeydown,

    textarea,
  }
}

function formateValue(
  curValue: string,
  props: ExtractPropTypes<typeof textareaItemProps>
) {
  const customValue = props.formation(curValue)
  if (customValue) {
    return customValue
  }
  return { value: curValue }
}

/**
 * auto calculate height of textarea
 */
function calcTextareaHeight(
  textarea: HTMLElement,
  maxHeightInner: Ref<number>
) {
  textarea.style.height = 'auto'
  let scrollHeight = textarea.scrollHeight
  // if textarea-item is not displayed, avoid height calculations
  if (scrollHeight === 0) {
    return
  }
  if (
    maxHeightInner.value &&
    scrollHeight > maxHeightInner.value
  ) {
    scrollHeight = maxHeightInner.value
  }
  textarea.style.height = scrollHeight + 'px'
}
