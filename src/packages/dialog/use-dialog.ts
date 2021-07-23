import { computed } from 'vue'
import {
  HIDE_EVENT,
  SHOW_EVENT,
  UPDATE_MODEL_EVENT,
} from 'mand-mobile-next/utils'
import type {
  PropType,
  SetupContext,
  ExtractPropTypes,
} from 'vue'

export interface ActionOption {
  text?: string
  handler?: (...args: any) => void
  disabled?: boolean
  warning?: boolean
  loading?: boolean
  icon?: string
  iconSvg?: boolean
}

export const dialogProps = {
  modelValue: {
    type: Boolean,
    default: false,
  },
  title: {
    type: String,
    default: '',
  },
  icon: {
    type: String,
    default: '',
  },
  iconSvg: {
    type: Boolean,
    default: false,
  },
  closable: {
    type: Boolean,
    default: true,
  },
  content: {
    type: String,
    default: '',
  },
  actions: {
    type: Array as PropType<ActionOption[]>,
    default: () => {
      /* istanbul ignore next */
      return []
    },
  },
  layout: {
    type: String,
    default: 'row',
  },
  appendTo: {
    type: [Object, String] as PropType<
      HTMLElement | string
    >,
    default: () => globalThis.document.body,
  },
  hasMask: {
    type: Boolean,
    default: true,
  },
  maskClosable: {
    type: Boolean,
    default: false,
  },
  transition: {
    type: String,
    default: 'md-fade',
  },
  preventScroll: {
    type: Boolean,
    default: false,
  },
  preventScrollExclude: {
    type: [Object] as PropType<HTMLElement>,
    default: undefined,
  },
}

export const emits: (
  | 'update:modelValue'
  | 'hide'
  | 'show'
)[] = [UPDATE_MODEL_EVENT, HIDE_EVENT, SHOW_EVENT]

export const useDialog = (
  props: ExtractPropTypes<typeof dialogProps>,
  {
    emit,
  }: SetupContext<('update:modelValue' | 'hide' | 'show')[]>
) => {
  const dialogShow = computed({
    get: () => props.modelValue,
    set: () => emit(UPDATE_MODEL_EVENT, false),
  })

  const close = () => {
    emit(UPDATE_MODEL_EVENT, false)
  }

  const onHide = () => {
    emit(HIDE_EVENT)
  }
  const onShow = () => {
    emit(SHOW_EVENT)
  }

  const actionHandler = (action: ActionOption) => {
    if (action.disabled || action.loading) {
      return
    }
    if (typeof action.handler === 'function') {
      action.handler.call(null, action)
    } else {
      close()
    }
  }

  return {
    dialogShow,
    close,
    onHide,
    onShow,
    actionHandler,
  }
}
