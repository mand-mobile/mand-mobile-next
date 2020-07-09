<template>
  <div class="md-image-reader">
    <div class="md-image-reader-file" @click="$_onChooseImage"></div>
  </div>
</template>

<script>
import createImageReader from './image-reader'
import { dataURItoBlob } from './image-dataurl'
import { randomId } from '@mand-mobile/shared/lib/util'

const ERROR = {
  '100': 'browser does not support',
  '101': 'picture size is beyond the preset',
  '102': 'picture read failure',
  '103': 'the number of pictures exceeds the limit'
}

export default {
  name: 'md-image-reader',

  props: {
    name: {
      type: String,
      default() {
        return randomId('image-reader')
      }
    },
    size: {
      type: [String, Number],
      default: 0
    },
    isCameraOnly: {
      type: Boolean,
      default: false
    },
    amount: {
      type: Number,
      default: 0
    }
  },

  methods: {
    // MARK: private methods
    $_emitter(event, data) {
      this.$emit(event, this.name, data)
    },
    // MARK: events handler
    $_onChooseImage() {
      uni.chooseImage({
        count: this.amount,
        sizeType: ['original', 'compressed'],
        sourceType: this.isCameraOnly ? ['camera'] : ['camera', 'album'],
        success: res => {
          const { tempFiles } = res || {}
          if (!tempFiles) {
            this.$_emitter('error', {
              code: '102',
              msg: ERROR['102']
            })
            return
          }
          if (this.amount && tempFiles.length > this.amount) {
            this.$_emitter('error', {
              code: '103',
              msg: ERROR['103']
            })
            return
          }
          tempFiles.forEach(file => {
            if (this.size && file.size > this.size) {
              this.$_emitter('error', {
                code: '101',
                msg: ERROR['101']
              })
              return
            }
            this.$_emitter('complete', {
              dataUrl: file.path,
              file
            })
          })
        },
        fail: err => {
          this.$_emitter('error', {
            code: '102',
            msg: ERROR['102']
          })
        }
      })
    }
  }
}
</script>

<style lang="stylus">
.md-image-reader {
  position: absolute;
  width: 100%;
  height: 100%;
  z-index: 100;
  left: 0;
  top: 0;
  -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
}

.md-image-reader-file {
  position: absolute;
  width: 100%;
  height: 100%;
  opacity: 0;
  left: 0;
  top: 0;
  -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
}
</style>
