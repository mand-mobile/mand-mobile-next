import type { App } from 'vue'
import ImageUploader from './index.vue'

ImageUploader.install = (app: App) => {
  app.component(ImageUploader.name, ImageUploader)
}

export { ImageUploader }
export default ImageUploader
