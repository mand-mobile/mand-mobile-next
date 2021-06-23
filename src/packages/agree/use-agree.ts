import { computed } from 'vue'
import {
  UPDATE_MODEL_EVENT,
  CHANGE_EVENT,
} from 'mand-mobile/utils'
import type {
  ExtractPropTypes,
  PropType,
  SetupContext,
} from 'vue'

export const emits: ('update:modelValue' | 'change')[] = [
  UPDATE_MODEL_EVENT,
  CHANGE_EVENT,
]

export const agreeProps = {
  modelValue: {
    type: Boolean,
    default: false,
  },
  disabled: {
    type: Boolean,
    default: false,
  },
  size: {
    type: String as PropType<'xs' | 'sm' | 'md' | 'lg'>,
    default: 'md',
  },
}

export const useAgree = (
  props: ExtractPropTypes<typeof agreeProps>,
  { emit }: SetupContext<('update:modelValue' | 'change')[]>
) => {
  const onChange = (event: Event) => {
    if (props.disabled) {
      return
    }
    emit(UPDATE_MODEL_EVENT, !props.modelValue)
    emit(CHANGE_EVENT, event)
  }

  const currentIcon = computed(() => {
    return props.modelValue ? 'checked' : 'check'
  })

  return {
    onChange,
    currentIcon,
  }
}
