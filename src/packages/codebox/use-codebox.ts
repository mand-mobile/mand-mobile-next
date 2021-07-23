import { computed, onMounted, ref, watchEffect } from 'vue'
import { UPDATE_MODEL_EVENT } from 'mand-mobile-next/utils'
import type {
  ExtractPropTypes,
  SetupContext,
  ComponentPublicInstance,
} from 'vue'

export const codeboxProps = {
  modelValue: {
    type: String,
    default: '',
  },
  maxlength: {
    type: Number,
    default: 4,
  },
  autofocus: {
    type: Boolean,
    default: false,
  },
  /**
   * @deprecated
   */
  disabled: {
    type: Boolean,
    default: false,
  },
  justify: {
    type: Boolean,
    default: false,
  },
  mask: {
    type: Boolean,
    default: false,
  },
  system: {
    type: Boolean,
    default: false,
  },
  okText: {
    type: String,
  },
  disorder: {
    type: Boolean,
    default: false,
  },
  isView: {
    type: Boolean,
    default: false,
  },
}

export const emits: 'update:modelValue'[] = [
  UPDATE_MODEL_EVENT,
]

export const useCodebox = (
  props: ExtractPropTypes<typeof codeboxProps>,
  { emit }: SetupContext<'update:modelValue'[]>
) => {
  const code = computed({
    get: () => props.modelValue,
    set: (val) => emit(UPDATE_MODEL_EVENT, val),
  })

  const focused = ref(false)

  const focusHandler = () => {
    focused.value = true
    if (props.system) {
      nativeInputRef.value?.focus()
    }
  }
  const blurHandler = () => {
    focused.value = false
  }

  const inputHandler = (val: number) => {
    if (code.value.length < props.maxlength) {
      code.value += `${val}`
    }
  }
  const nativeInputHandler = (e: Event) => {
    if (
      (e.target as HTMLInputElement).value.length <=
      props.maxlength
    ) {
      code.value = (e.target as HTMLInputElement).value
    }
  }

  const deleteHandler = () => {
    code.value = `${code.value}`.slice(0, -1)
  }

  const numberKeyBoardRef =
    ref<ComponentPublicInstance<any> | null>(null)
  const box = computed<HTMLElement | undefined>(
    () => numberKeyBoardRef.value?.$refs.popup?.box
  )
  const nativeInputRef = ref<HTMLElement | null>(null)

  watchEffect(() => {
    if (code.value.length >= props.maxlength) {
      blurHandler()
    }
  })

  onMounted(() => {
    props.autofocus && focusHandler()
  })

  return {
    code,
    focused,
    focusHandler,
    blurHandler,
    inputHandler,
    nativeInputHandler,
    deleteHandler,
    numberKeyBoardRef,
    box,
    nativeInputRef,
  }
}

/* istanbul ignore next */
export function focusAndOpenKeyboard(
  el: HTMLElement,
  timeout = 100
) {
  if (el) {
    // Align temp input element approximately where the input element is
    // so the cursor doesn't jump around
    const __tempEl__ = document.createElement('input')
    __tempEl__.style.position = 'absolute'
    __tempEl__.style.top = el.offsetTop + 7 + 'px'
    __tempEl__.style.left = el.offsetLeft + 'px'
    __tempEl__.style.height = 0 + 'px'
    __tempEl__.style.opacity = '0'
    __tempEl__.style.border = 'none'
    __tempEl__.style.outline = 'none'
    // Put this temp element as a child of the page <body> and focus on it
    document.body.appendChild(__tempEl__)
    __tempEl__.focus()

    // The keyboard is open. Now do a delayed focus on the target element
    setTimeout(function () {
      el?.focus?.()
      el?.click?.()
    }, timeout)

    const removeInput = () => {
      if (__tempEl__) {
        __tempEl__.focus()
        __tempEl__.blur()
        // Remove the temp element
        document.body.removeChild(__tempEl__)
      }
    }

    return removeInput
  }
}
