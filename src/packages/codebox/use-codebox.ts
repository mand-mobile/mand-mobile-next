import { computed, ref, watchEffect } from 'vue'
import { UPDATE_MODEL_EVENT } from 'mand-mobile/utils'
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
  closable: {
    type: Boolean,
    default: true,
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
    () => numberKeyBoardRef.value?.$refs.popup.box
  )
  const nativeInputRef = ref<HTMLElement | null>(null)

  watchEffect(() => {
    if (code.value.length >= props.maxlength) {
      blurHandler()
    }
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
