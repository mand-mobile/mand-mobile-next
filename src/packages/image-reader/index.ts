import type { App } from 'vue'
import ImageReader from './index.vue'
import { CreateImageReader } from './image-reader'
import { imageProcessor } from './image-processor'
import { imageReaderProps } from './use-image-reader'
import {
  dataURIToArrayBuffer,
  dataURItoBlob,
} from './image-dataurl'

ImageReader.install = (app: App) => {
  app.component(ImageReader.name, ImageReader)
}

export {
  ImageReader,
  imageReaderProps,
  CreateImageReader,
  imageProcessor,
  dataURIToArrayBuffer,
  dataURItoBlob,
}

export default ImageReader
