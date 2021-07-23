<script lang="ts">
export default {
  name: 'ImageUploaderDemo',
  title: '压缩图片',
}
</script>
<script setup lang="ts">
import { reactive, ref } from 'vue'
import MdImageUploader from 'mand-mobile-next/image-uploader'
import Toast from 'mand-mobile-next/toast'
const fileList1 = ref([
  {
    dataUrl:
      '//manhattan.didistatic.com/static/manhattan/insurancePlatform_spu/uploads/c2912793a222eb24b606a582fd849ab7',
  },
])

const fileList2 = ref([
  {
    dataUrl:
      '//manhattan.didistatic.com/static/manhattan/insurancePlatform_spu/uploads/c2912793a222eb24b606a582fd849ab7',
  },
])

const processorOption1 = ref({
  width: 800,
  height: 800,
  quality: 0.8,
})

const processorOption2 = ref({
  width: 400,
  height: 400,
  quality: 0.3,
})

const uploadError = (res: {
  errorCode: number
  errorMsg: string
}) => {
  Toast.info(res.errorMsg || '上传失败')
}
</script>

<template>
  <div>
    <md-image-uploader
      v-model="fileList1"
      :is-multiple="true"
      :is-processor="true"
      :processor-option="processorOption1"
      @error="uploadError"
    />
  </div>
  <div>
    <md-image-uploader
      v-model="fileList2"
      :is-multiple="true"
      :is-processor="true"
      :processor-option="processorOption2"
      @error="uploadError"
    />
  </div>
</template>
