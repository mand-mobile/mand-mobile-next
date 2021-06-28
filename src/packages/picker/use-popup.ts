import { ref, computed, watch, nextTick } from 'vue'

import {
  UPDATE_MODEL_EVENT,
  UPDATE_VISIBLE_EVENT,
  SHOW_EVENT,
  HIDE_EVENT,
  CHANGE_EVENT,
  CONFIRM_EVENT,
  CANCEL_EVENT,
} from 'mand-mobile/utils'

import { useShow } from 'mand-mobile/composable'
import { t } from 'mand-mobile/locale'

type EmitsType =
  | 'update:modelValue'
  | 'update:visible'
  | 'hide'
  | 'show'
  | 'change'
  | 'confirm'
  | 'cancel'

export const emits: EmitsType[] = [
  UPDATE_MODEL_EVENT,
  UPDATE_VISIBLE_EVENT,
  HIDE_EVENT,
  SHOW_EVENT,
  CHANGE_EVENT,
  CONFIRM_EVENT,
  CANCEL_EVENT,
]

import type { ExtractPropTypes, SetupContext } from 'vue'

export const popupProps = {
  visible: {
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
    default: t('md.picker.confirm'),
  },
  cancelText: {
    type: String,
    default: t('md.picker.cancel'),
  },
  largeRadius: {
    type: Boolean,
    default: false,
  },
  maskClosable: {
    type: Boolean,
    default: true,
  },
}

export const usePopup = (
  props: ExtractPropTypes<
    typeof popupProps & { modelValue: any }
  >,
  { emit }: SetupContext<EmitsType[]>
) => {
  const pickerView = ref<any>(null)

  const {
    popupShow,
    onHide: hideHandler,
    onShow: showHandler,
    hide: hidePicker,
  } = useShow(props, emit)

  const onShow = () => {
    // innerValue.value = props.modelValue
    showHandler()
  }

  watch(popupShow, (val) => {
    if (val) {
      innerValue.value = props.modelValue
      nextTick(() => {
        pickerView.value && pickerView.value?.resetWheel()
      })
    }
  })

  const onHide = () => {
    pickerView.value && pickerView.value?.destroyWheel()
    hideHandler()
    // innerValue.value = props.modelValue
  }

  const onPickerHide = () => {
    pickerView.value && pickerView.value?.destroyWheel()
    hidePicker()
  }

  const innerValue = ref<any>(props.modelValue)

  const onPickerChange = (
    columnIndex: number,
    itemIndex: number,
    values: unknown
  ) => {
    emit(CHANGE_EVENT, columnIndex, itemIndex, values)
  }

  const isConfirm = computed(() => props.okText !== '')

  const cancelHandler = () => {
    emit(CANCEL_EVENT)
    onPickerHide()
  }

  const confirmHandler = () => {
    if (Array.isArray(innerValue.value)) {
      innerValue.value.length > 0 &&
        emit(UPDATE_MODEL_EVENT, innerValue.value)
    } else if (innerValue.value) {
      emit(UPDATE_MODEL_EVENT, innerValue.value)
    }
    emit(CONFIRM_EVENT)
    onPickerHide()
  }

  watch(innerValue, (val) => {
    if (
      !isConfirm.value &&
      Array.isArray(props.modelValue)
    ) {
      emit(UPDATE_MODEL_EVENT, val)
    } else if (innerValue.value) {
      emit(UPDATE_MODEL_EVENT, innerValue.value)
    }
  })

  return {
    pickerView,
    popupShow,
    innerValue,
    onHide,
    onShow,
    confirmHandler,
    cancelHandler,
    onPickerChange,
  }
}
