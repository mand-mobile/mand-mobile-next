import { computed } from 'vue'
import { t } from 'mand-mobile/locale'
import { useShow } from 'mand-mobile/composable'
import {
  UPDATE_MODEL_EVENT,
  UPDATE_VISIBLE_EVENT,
  HIDE_EVENT,
  SHOW_EVENT,
  CHANGE_EVENT,
} from 'mand-mobile/utils'
import type {
  PropType,
  ExtractPropTypes,
  SetupContext,
} from 'vue'

/**
 * multi v-model
 * v-model
 * v-model:visible
 * so doesnot need select event defaultIndex
 */
export const actionSheetProps = {
  modelValue: {
    type: [String, Number],
    default: '',
  },
  /**
   * for popup show/hide
   */
  visible: {
    type: Boolean,
    default: false,
  },
  title: {
    type: String,
    default: '',
  },
  options: {
    type: Array as PropType<
      Array<{
        text?: string | number
        value: string | number
        label?: string | number
      }>
    >,
    default: () => [],
  },
  /**
   * @deprecated
   */
  defaultIndex: {
    type: Number,
    default: -1,
  },
  invalidIndex: {
    type: Number,
    default: -1,
  },
  cancelText: {
    type: String,
    default: t('md.action-sheet.cancel'),
  },
}
export const CANCEL = 'cancel'
export const emits = [
  UPDATE_MODEL_EVENT,
  UPDATE_VISIBLE_EVENT,
  HIDE_EVENT,
  SHOW_EVENT,
  CANCEL,
  CHANGE_EVENT,
]
export const useActionSheet = (
  props: ExtractPropTypes<typeof actionSheetProps>,
  { emit }: SetupContext<typeof emits>
) => {
  const {
    popupShow,
    onHide,
    onShow,
    hide: hideSheet,
  } = useShow(props, emit)

  const cancelHandler = () => {
    emit(CANCEL)
    hideSheet()
  }

  const onSelect = (
    item: ExtractPropTypes<
      typeof actionSheetProps
    >['options'][0]
  ) => {
    const itemIndex = props.options.findIndex(
      (option) => option.value === item.value
    )
    if (itemIndex === props.invalidIndex) return
    emit(UPDATE_MODEL_EVENT, item.value)
    emit(CHANGE_EVENT, item)
    hideSheet()
  }

  const currentIndex = computed(() =>
    props.options.findIndex(
      (item) => item.value === props.modelValue
    )
  )

  return {
    hideSheet,
    cancelHandler,
    onHide,
    onShow,
    popupShow,
    currentIndex,
    onSelect,
  }
}
