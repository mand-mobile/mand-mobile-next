import { computed, ref } from 'vue'
import { t } from 'mand-mobile/locale'
import {
  UPDATE_MODEL_EVENT,
  UPDATE_VISIBLE_EVENT,
  HIDE_EVENT,
  SHOW_EVENT,
} from 'mand-mobile/utils'
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
  const scroller = ref<any>(null)

  const {
    popupShow,
    onHide,
    onShow: showHandler,
    hideSelector,
  } = useShow(props, emit)

  const onShow = () => {
    showHandler()
    /**
     * important the scroller need reset after popup show
     */
    scroller.value.resetScroller()
  }

  const { multiValue, onCancel, onSelect } = useSelect(
    props,
    emit
  )

  const cancelHandler = () => {
    onCancel()
    hideSelector()
  }

  const confirmHandler = () => {
    if (!Array.isArray(props.modelValue)) {
      props.modelValue !== '' &&
        (emit(CONFIRM), hideSelector())
    } else {
      props.modelValue.length > 0 &&
        (emit(CONFIRM), hideSelector())
    }
  }

  const selectHandler = (
    item: ExtractPropTypes<typeof selectorProps>['data'][0]
  ) => {
    onSelect(item)
    if (props.okText === '') {
      hideSelector()
    }
  }

  return {
    scroller,
    popupShow,
    onHide,
    onShow,
    confirmHandler,
    cancelHandler,
    selectHandler,

    multiValue,
  }
}

function useShow(
  props: ExtractPropTypes<typeof selectorProps>,
  emit: SetupContext<EmitsType[]>['emit']
) {
  const popupShow = computed({
    get: () => props.visible,
    set: () => hideSelector(),
  })
  const onHide = () => {
    emit(HIDE_EVENT)
    hideSelector()
  }
  const onShow = () => {
    emit(SHOW_EVENT)
  }

  const hideSelector = () => {
    emit(UPDATE_VISIBLE_EVENT, false)
  }
  return { popupShow, onHide, onShow, hideSelector }
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
   * multi
   */
  const multiValue = computed({
    get: () =>
      Array.isArray(props.modelValue)
        ? props.modelValue
        : [],
    set: (val) => emit(UPDATE_MODEL_EVENT, val),
  })

  return { multiValue, onSelect, onCancel }
}
