import { computed, ref, watch, watchEffect } from 'vue'
import { t } from 'mand-mobile-next/locale'
import { useShow } from 'mand-mobile-next/composable'
import {
  UPDATE_MODEL_EVENT,
  UPDATE_VISIBLE_EVENT,
  HIDE_EVENT,
  SHOW_EVENT,
} from 'mand-mobile-next/utils'
import type {
  ExtractPropTypes,
  PropType,
  SetupContext,
} from 'vue'

type ValueType = string | number
type EmitsType =
  | 'update:modelValue'
  | 'update:visible'
  | 'hide'
  | 'show'
  | 'select'
  | 'confirm'
  | 'cancel'

export const CANCEL = 'cancel'
export const CONFIRM = 'confirm'
export const SELECT = 'select'

export const emits: EmitsType[] = [
  CANCEL,
  CONFIRM,
  SELECT,
  UPDATE_MODEL_EVENT,
  UPDATE_VISIBLE_EVENT,
  HIDE_EVENT,
  SHOW_EVENT,
]
export const selectorProps = {
  modelValue: {
    type: [Number, String, Array] as PropType<
      number | string | (string | number)[]
    >,
    default: '',
  },
  visible: {
    type: Boolean,
    default: false,
  },
  data: {
    type: Array as PropType<
      {
        text?: ValueType
        value: ValueType
        [k: string]: any
      }[]
    >,
    default: () => [],
  },
  /**
   * @deprecated
   */
  defaultValue: {
    default: '',
  },
  isCheck: {
    type: Boolean,
    default: false,
  },
  maxHeight: {
    type: [Number, String],
    default: '40vh',
  },
  minHeight: {
    type: [Number, String],
    default: 'auto',
  },
  cancelText: {
    type: String,
    default: '',
  },
  iconPosition: {
    type: String as PropType<'left' | 'right'>,
    default: 'right',
  },
  /**
   * @deprecated
   */
  multi: {
    type: Boolean,
    default: false,
  },
  hideTitleBar: {
    type: Boolean,
    default: false,
  },
  title: {
    type: String,
    default: '',
  },
  describe: {
    type: String,
    default: '',
  },
  okText: {
    type: String,
    default: '',
  },
  maskClosable: {
    type: Boolean,
    default: true,
  },
  icon: {
    type: String,
    default: 'checked',
  },
  iconInverse: {
    type: String,
    default: 'check',
  },
  iconDisabled: {
    type: String,
    default: 'check-disabled',
  },
  iconSvg: {
    type: Boolean,
    default: false,
  },
  iconSize: {
    type: String,
    default: 'md',
  },
}

export const useSelector = (
  props: ExtractPropTypes<typeof selectorProps>,
  { emit }: SetupContext<EmitsType[]>
) => {
  /**
   * @deprecated
   */
  const scroller = ref<any>(null)

  const content = ref<HTMLElement | undefined>(undefined)

  const {
    popupShow,
    onHide: hideHandler,
    onShow: showHandler,
    hide: hideSelector,
  } = useShow(props, emit)

  const directHide = () => {
    if (!isConfirm.value) {
      hideSelector()
    }
  }

  const onShow = () => {
    showHandler()
    /**
     * important the scroller need reset after popup show
     */
    scroller.value?.resetScroller()
  }

  const onHide = () => {
    hideHandler()
    innerValue.value = props.modelValue
  }

  const { innerValue, onCancel, onSelect } = useSelect(
    props,
    emit
  )

  const isConfirm = computed(() => props.okText !== '')

  const cancelHandler = () => {
    onCancel()
    hideSelector()
  }

  const confirmHandler = () => {
    if (!Array.isArray(props.modelValue)) {
      props.modelValue !== '' &&
        (emit(CONFIRM),
        emit(UPDATE_MODEL_EVENT, innerValue.value),
        hideSelector())
    } else {
      props.modelValue.length > 0 &&
        (emit(CONFIRM),
        emit(UPDATE_MODEL_EVENT, innerValue.value),
        hideSelector())
    }
  }

  watch(innerValue, (val) => {
    if (
      !isConfirm.value &&
      !Array.isArray(props.modelValue)
    ) {
      onSelect(
        props.data.find((item) => item.value === val) as any
      )
      hideSelector()
    } else if (
      !isConfirm.value &&
      Array.isArray(props.modelValue)
    ) {
      emit(UPDATE_MODEL_EVENT, val)
      hideSelector()
    }
  })

  return {
    content,
    scroller,
    popupShow,
    directHide,
    onHide,
    onShow,
    confirmHandler,
    cancelHandler,
    innerValue,
  }
}

function useSelect(
  props: ExtractPropTypes<typeof selectorProps>,
  emit: SetupContext<EmitsType[]>['emit']
) {
  const onSelect = (
    item: ExtractPropTypes<typeof selectorProps>['data'][0]
  ) => {
    emit(UPDATE_MODEL_EVENT, item.value)
    emit(SELECT, item)
  }

  const onCancel = () => {
    emit(CANCEL)
  }

  /**
   * innerValue
   */
  const innerValue = ref<
    string | number | (string | number)[]
  >(props.modelValue)

  return { innerValue, onSelect, onCancel }
}
