import {randomId} from '@mand-mobile/shared/lib/util'

const ERROR = {
  '100': 'browser does not support',
  '101': 'picture size is beyond the preset',
  '102': 'picture read failure',
  '103': 'the number of pictures exceeds the limit',
}

export default {
  props: {
    name: {
      type: String,
      default() {
        return randomId('image-reader')
      },
    },
    size: {
      type: [String, Number],
      default: 0,
    },
    mime: {
      type: Array,
      default() {
        /* istanbul ignore next */
        return []
      },
    },
    isCameraOnly: {
      type: Boolean,
      default: false,
    },
    isMultiple: {
      type: Boolean,
      default: false,
    },
    amount: {
      type: Number,
      default: 0,
    },
  },

  methods: {
    $_emitter(event, data) {
      this.$emit(event, this.name, data)
    },
    $_emitError(code) {
      this.$_emitter('error', {
        code,
        msg: ERROR[code],
      })
    },
    $_mixinReaderChange(files) {
      /* istanbul ignore next */
      if (files && files.length) {
        this.$_emitter('select', {
          files: Array.prototype.slice.call(files),
        })

        // error 超出每次上传最大张数
        if (this.amount && files.length > this.amount) {
          this.$_emitError(103)
          this.$_cleaeFile()
          return
        }

        this.$_readFile(files)
      } else {
        this.$_emitError(102)
      }
    },
    $_mixinReaderComplete(errorCode, imageData) {
      if (errorCode) {
        this.$_emitError(errorCode)
        return
      }

      this.$_emitter('complete', imageData)
    },
  },
}
