import { ref, watchEffect, watch } from 'vue'

import {
  DELETE_EVENT,
  UPDATE_VISIBLE_EVENT,
  UPDATE_LIST_EVENT,
} from 'mand-mobile-next/utils'

import type { ExtractPropTypes, SetupContext } from 'vue'

export const imageViewerProps = {
  visible: {
    type: Boolean,
    default: false,
  },
  list: {
    type: Array,
    default: () => [],
  },
  defaultIndex: {
    type: Number,
    default: 0,
  },
  hasDots: {
    type: Boolean,
    default: true,
  },
  deletable: {
    type: Boolean,
    default: false,
  },
}

export const emits: (
  | 'update:list'
  | 'delete'
  | 'update:visible'
)[] = [
  UPDATE_LIST_EVENT,
  DELETE_EVENT,
  UPDATE_VISIBLE_EVENT,
]

export const useImageViewer = (
  props: ExtractPropTypes<typeof imageViewerProps>,
  {
    emit,
  }: SetupContext<
    ('update:list' | 'delete' | 'update:visible')[]
  >
) => {
  const currentImgIndex = ref(0)
  const isViewerShow = ref(false)
  const dataList = ref<any[]>([])

  const initDataList = (dataList: any[]) => {
    const newImgsList: any[] = []

    dataList.map((item) => {
      const _item =
        typeof item === 'object' ? item : { dataUrl: item }
      newImgsList.push(_item)
    })
    return newImgsList
  }

  watchEffect(() => {
    isViewerShow.value = props.visible
  })

  watchEffect(() => {
    dataList.value = initDataList(props.list)
  })

  watch(
    () => props.defaultIndex,
    (newVal, oldVal) => {
      currentImgIndex.value = newVal
    }
  )

  const closeViewer = () => {
    isViewerShow.value = false
    emit(UPDATE_VISIBLE_EVENT, false)
  }

  const showViewer = (index: number) => {
    isViewerShow.value = true
    currentImgIndex.value = index
    emit(UPDATE_VISIBLE_EVENT, true)
  }

  const afterChange = (
    fromIndex: number,
    toIndex: number
  ) => {
    currentImgIndex.value = toIndex
  }

  const onDeleteImage = (index: number) => {
    dataList.value.splice(index, 1)

    emit(UPDATE_LIST_EVENT, dataList)
    emit(DELETE_EVENT, index)
  }

  return {
    currentImgIndex,
    isViewerShow,
    dataList,

    onDeleteImage,
    showViewer,
    closeViewer,
    afterChange,
  }
}
