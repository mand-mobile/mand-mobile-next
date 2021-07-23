<template>
  <div class="md-image-uploader">
    <div class="md-image-list-box">
      <md-image-viewer
        v-model:list="dataList"
        :deletable="deletable"
      >
        <div
          v-if="!isOverMaxCount"
          class="md-image-item add"
          :class="{ disabled: disabled }"
        >
          <md-image-reader
            :disabled="disabled"
            :accept="accept"
            :max-size="maxSize"
            :max-amount="maxAmount"
            :is-multiple="isMultiple"
            :capture="isCameraOnly"
            :multiple="isMultiple"
            @select="onUploadSelect"
            @complete="onUploadComplete"
            @error="onUploadError"
          ></md-image-reader>
          <md-icon
            name="camera"
            size="md"
            color="#CCC"
          ></md-icon>
          <p class="info">添加图片</p>
        </div>
      </md-image-viewer>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import MdIcon from 'mand-mobile-next/icon'
import MdImageReader from 'mand-mobile-next/image-reader'
import MdImageViewer from 'mand-mobile-next/image-viewer'

// use logic
import {
  emits,
  imageUploaderProps,
  useImageUploader,
} from './use-image-uploader'

export default defineComponent({
  name: 'MdImageUploader',
  components: {
    MdImageReader,
    MdIcon,
    MdImageViewer,
  },

  props: imageUploaderProps,

  emits,

  setup(props, context) {
    const {
      isOverMaxCount,
      dataList,
      onUploadComplete,
      onUploadError,
      onUploadSelect,
    } = useImageUploader(props, context)

    return {
      dataList,
      isOverMaxCount,
      onUploadComplete,
      onUploadError,
      onUploadSelect,
    }
  },
})
</script>

<style lang="stylus">
.md-image-uploader
  width 100%
  height 100%
  .md-image-list
    min-height 200px
    .md-image-item
      position relative
      width 31%
      height 200px
      border-radius 8px
      margin 0  1% 2% 1%
      background #FFF
      box-shadow 0 5px 20px rgba(197, 202, 213, .25)
      box-sizing border-box
      list-style none
      &.add
        min-width 31%
        text-align center
        .md-icon
          position absolute
          top 40%
          left 50%
          transform translate(-50%, -50%)
          opacity 0.5
        p.info
          margin-top 60%
          color #ccc
          font-size 22px
      &.disabled
        opacity 0.5
        cursor not-allowed
    .md-image-view
      width 100%
      height 100%
      border-radius 8px
    .md-tag
      position absolute
      right 0
      top 0
</style>
