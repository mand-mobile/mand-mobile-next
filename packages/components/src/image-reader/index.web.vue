<template>
  <div class="md-image-reader">
    <input
      class="md-image-reader_file"
      type="file"
      :key="inputTmpKey"
      :name="name"
      :accept="mimeType"
      :capture="isCameraOnly"
      :multiple="isMultiple"
      @change="$_onReaderChange"
    />
  </div>
</template>

<script>
import {functionToUrl} from '@mand-mobile/shared/lib/util'
import imageReaderMixin from './mixins'
import createImageReader from './image-reader'
import {dataURItoBlob} from './image-dataurl'

export default {
  name: 'md-image-reader',

  mixins: [imageReaderMixin],

  data() {
    return {
      inputTmpKey: Date.now(), // trigger of refreshing input file
    }
  },

  computed: {
    mimeType() {
      /* istanbul ignore else */
      if (this.mime.length) {
        let mimeStr = ''
        this.mime.forEach(type => {
          mimeStr += `image/${type},`
        })
        return mimeStr.substring(0, mimeStr.length - 1)
      } else {
        return 'image/*'
      }
    },
  },

  methods: {
    $_openWebWorker(fn) {
      /* istanbul ignore next */
      return new Worker(functionToUrl(fn))
    },
    $_closeWebWorker(worker) {
      /* istanbul ignore next */
      worker.terminate()
    },
    $_readFile(files) {
      const size = +this.size * 1000
      let worker
      let count = 0

      const onReaderComplete = ({errorCode, dataUrl, file}) => {
        this.$_mixinReaderComplete(errorCode, {
          blob: dataURItoBlob(dataUrl),
          dataUrl: dataUrl,
          file,
        })
        this.$_clearFile()
      }

      /* istanbul ignore if */
      if (window.Worker) {
        worker = this.$_openWebWorker(createImageReader)
        // worker send
        worker.postMessage({
          files,
          size: size,
          isWebWorker: true,
        })
        // worker response
        worker.onmessage = evt => {
          onReaderComplete(evt.data)

          count++

          // shut down worker after all files have been read
          if (count === files.length) {
            this.$_closeWebWorker(worker)
          }
        }
      } else {
        // generate imageReader
        const imageReader = createImageReader(window)
        imageReader({
          files,
          size: size,
          isWebWorker: false,
          complete: onReaderComplete,
        })
      }
    },
    $_clearFile() {
      this.inputTmpKey = Date.now()
    },

    // MARK: events handler
    $_onReaderChange(event) {
      this.$_mixinReaderChange(event.target.files)
    },
  },
}

</script>

<style lang="stylus">
.md-image-reader
  position absolute
  width 100%
  height 100%
  z-index 100
  left 0
  top 0
  -webkit-tap-highlight-color rgba(0, 0, 0, 0)
  &_file
    position absolute
    width 100%
    height 100%
    opacity 0
    left 0
    top 0
    -webkit-tap-highlight-color rgba(0, 0, 0, 0)
</style>
