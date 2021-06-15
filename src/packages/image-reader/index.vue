<template>
  <div
    class="md-image-reader"
    :class="{ disabled: disabled }"
  >
    <input
      :key="inputTempKey"
      class="md-image-reader-file"
      type="file"
      :name="name"
      :maxSize="maxSize"
      :maxAmount="maxAmount"
      :disabled="disabled"
      :accept="acceptType"
      :capture="isCameraOnly"
      :multiple="isMultiple"
      @change="onFileChange"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

// use logic
import {
  emits,
  imageReaderProps,
  useImageUploader,
} from './use-image-reader'

export default defineComponent({
  name: 'MdImageReader',
  props: imageReaderProps,
  emits,

  setup(props) {
    const { inputTempKey, acceptType, onFileChange } =
      useImageUploader(props)

    return {
      inputTempKey,
      acceptType,

      onFileChange,
    }
  },
})
</script>

<style lang="stylus">
.md-image-reader
  position absolute
  width 100%
  height 100%
  z-index 100
  left 0
  top 0
  -webkit-tap-highlight-color rgba(0,0,0,0)
  &.disabled
    opacity 0.5
    cursor not-allowed

.md-image-reader-file
  position absolute
  width 100%
  height 100%
  opacity 0
  left 0
  top 0
  -webkit-tap-highlight-color rgba(0,0,0,0)
</style>
