import { computed, ref, watch, onMounted } from 'vue'

import {
  SELECT_EVENT,
  COMPLETE_EVENT,
  ERROR_EVENT,
  UPDATE_MODEL_EVENT,
  DELETE_EVENT,
} from 'mand-mobile-next/utils'

import { imageReaderProps } from 'mand-mobile-next/image-reader'

import type { ExtractPropTypes, SetupContext } from 'vue'

export const imageUploaderProps = {
  ...imageReaderProps,
  modelValue: {
    type: Array,
    default: () => [],
  },
  deletable: {
    type: Boolean,
    default: () => true,
  },
}

export const emits: (
  | 'error'
  | 'select'
  | 'complete'
  | 'update:modelValue'
  | 'delete'
)[] = [
  SELECT_EVENT,
  COMPLETE_EVENT,
  ERROR_EVENT,
  UPDATE_MODEL_EVENT,
  DELETE_EVENT,
]

export const useImageUploader = (
  props: ExtractPropTypes<typeof imageUploaderProps>,
  {
    emit,
  }: SetupContext<
    (
      | 'error'
      | 'select'
      | 'complete'
      | 'update:modelValue'
      | 'delete'
    )[]
  >
) => {
  const dataList = ref<any[]>([])

  const isOverMaxCount = computed(() => {
    if (props.maxAmount) {
      return props.modelValue.length >= props.maxAmount
    }
    return false
  })

  watch(
    () => props.modelValue,
    (newval) => {
      dataList.value = newval
    }
  )

  const onUploadSelect = (data: { files: File[] }) => {
    emit(SELECT_EVENT, data)
  }

  const onUploadComplete = (result: {
    dataUrl: string
    file: File
  }) => {
    const fileList = dataList.value.push(result)

    emit(COMPLETE_EVENT, result)
    emit(UPDATE_MODEL_EVENT, fileList)
  }

  const onUploadError = (data: { msg: string }) => {
    emit(ERROR_EVENT, data)
  }

  onMounted(() => {
    dataList.value = props.modelValue
  })

  return {
    isOverMaxCount,
    dataList,
    onUploadComplete,
    onUploadError,
    onUploadSelect,
  }
}
