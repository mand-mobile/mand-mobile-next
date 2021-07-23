<script lang="ts">
export default {
  name: 'ImageUploaderDemo',
  title: '仅限png图片类型',
}
</script>
<script setup lang="ts">
import { reactive, ref } from 'vue'
import MdImageUploader from 'mand-mobile-next/image-uploader'
import Toast from 'mand-mobile-next/toast'
const fileList = ref([
  {
    dataUrl:
      '//manhattan.didistatic.com/static/manhattan/insurancePlatform_spu/uploads/c2912793a222eb24b606a582fd849ab7',
  },
])

const acceptType = ref(['png'])
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
      v-model="fileList"
      :accept="acceptType"
      @error="uploadError"
    />
  </div>
</template>
