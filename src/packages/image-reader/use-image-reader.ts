import { ref, computed, PropType } from 'vue'

import { dataURItoBlob } from './image-dataurl'
import { CreateImageReader } from './image-reader'
import { imageProcessor } from './image-processor'

import {
  randomId,
  SELECT_EVENT,
  COMPLETE_EVENT,
  ERROR_EVENT,
} from 'mand-mobile-next/utils'

import type { ExtractPropTypes, SetupContext } from 'vue'
import type { ICompleteResult } from './image-reader'

const ERROR = {
  '100': 'browser does not support',
  '101': 'picture size is beyond the preset',
  '102': 'picture read failure',
  '103': 'the number of pictures exceeds the limit',
} as { [key: string]: string }

export const imageReaderProps = {
  name: {
    type: String,
    default: () => {
      return randomId('image-reader')
    },
  },
  disabled: {
    type: Boolean,
    deault: () => false,
  },
  // max size
  maxSize: {
    type: [String, Number],
    default: Number.MAX_VALUE,
  },
  accept: {
    type: Array,
    default: () => [],
  },
  isCameraOnly: {
    type: Boolean,
    default: false,
  },
  isMultiple: {
    type: Boolean,
    default: false,
  },
  // max amount
  maxAmount: {
    type: Number,
    default: Number.MAX_VALUE,
  },
  beforeRead: {
    type: Function as PropType<
      (val: File | FileList) => boolean
    >,
    default: undefined,
  },
  isProcessor: {
    type: Boolean,
    default: () => false,
  },
  processorOption: {
    type: Object,
    default: () => {
      return {
        width: 300,
        height: 300,
        quality: 0.8,
      }
    },
  },
}

export const emits: ('error' | 'select' | 'complete')[] = [
  SELECT_EVENT,
  COMPLETE_EVENT,
  ERROR_EVENT,
]

export const useImageUploader = (
  props: ExtractPropTypes<typeof imageReaderProps>,
  {
    emit,
  }: SetupContext<('error' | 'select' | 'complete')[]>
) => {
  const inputTempKey = ref(Date.now())

  const clearFile = () => {
    inputTempKey.value = Date.now()
  }

  const acceptType = computed(() => {
    if (props.accept.length) {
      let mimeStr = ''
      props.accept.forEach((type) => {
        mimeStr += `image/${type},`
      })
      return mimeStr.substring(0, mimeStr.length - 1)
    } else {
      return 'image/*'
    }
  })

  const onReaderComplete = (result: ICompleteResult) => {
    if (result.errorCode !== 0) {
      emit(ERROR_EVENT, result)
      return
    }

    if (
      props.isProcessor &&
      props.processorOption &&
      result.data
    ) {
      const { width, height, quality } =
        props.processorOption

      imageProcessor({
        dataUrl: result.data,
        width,
        height,
        quality,
      }).then(({ dataUrl }: any) => {
        emit(COMPLETE_EVENT, {
          dataUrl: dataUrl,
          blob: dataURItoBlob(dataUrl as string),
          file: result.file,
          errorMsg: '上传成功',
          errorCode: 0,
        })
      })
      return
    }

    // success
    emit(COMPLETE_EVENT, {
      dataUrl: result.data,
      blob: dataURItoBlob(result.data as string),
      file: result.file,
      errorMsg: '上传成功',
      errorCode: 0,
    })
  }

  const readFile = (files: FileList) => {
    const options = {
      files,
      size: +props.maxSize * 1000,
      complete: onReaderComplete,
    }

    const creatImageReader = new CreateImageReader(options)
    creatImageReader.readImage()
  }

  const onFileChange = (event: Event) => {
    const { files } = event.target as HTMLInputElement

    if (!files || !files.length || props.disabled) {
      return
    }

    if (props.beforeRead) {
      const response = props.beforeRead(files)
      if (!response) {
        clearFile()
        return
      }
    }

    const filesArr = [].slice.call(files)

    emit(SELECT_EVENT, {
      files: filesArr,
    })

    // Maximum numbe
    if (
      filesArr &&
      props.maxAmount &&
      filesArr.length > props.maxAmount
    ) {
      emit(ERROR_EVENT, {
        errorCode: '103',
        errorMsg: ERROR['103'],
        data: null,
      })

      clearFile()
      return
    }

    readFile(filesArr as unknown as FileList)
  }

  return {
    inputTempKey,
    acceptType,

    onFileChange,
  }
}
