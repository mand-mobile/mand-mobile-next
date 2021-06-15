import { ref, SetupContext } from 'vue'
import {
  UPDATE_MODEL_EVENT,
  FOCUS_EVENT,
  BLUR_EVENT,
} from 'mand-mobile/utils'

import type { ExtractPropTypes } from 'vue'

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
}

export const useFakeInput = (
  props: ExtractPropTypes<typeof fakeInputProps>,
  {
    emit,
  }: SetupContext<
    ('focus' | 'blur' | 'update:modelValue')[]
  >
) => {
  const isFocus = ref(false)
  const isWaiting = ref(false)

  const clickHandler = () => {
    isFocus.value = true
    emit(FOCUS_EVENT)
  }

  const blurHandler = () => {
    isFocus.value = false
    emit(BLUR_EVENT)
  }

  const inputHandler = (val: string) => {
    emit(
      UPDATE_MODEL_EVENT,
      val.substring(0, props.maxlength)
    )
  }

  return {
    isFocus,
    isWaiting,
    clickHandler,
    blurHandler,
    inputHandler,
  }
}
