import type { App } from 'vue'
import ImageViewer from './index.vue'

ImageViewer.install = (app: App) => {
  app.component(ImageViewer.name, ImageViewer)
}

export { ImageViewer }
export default ImageViewer
