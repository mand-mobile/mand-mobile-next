<script lang="ts">
export default {
  name: 'ImageUploaderDemo',
  title: '最多上传3张数, 且限制最大500kb',
}
</script>
<script setup lang="ts">
import { ref } from 'vue'
import MdImageUploader from 'mand-mobile/image-uploader'
import Toast from 'mand-mobile/toast'
const fileList = ref([
  {
    dataUrl:
      '//manhattan.didistatic.com/static/manhattan/insurancePlatform_spu/uploads/c2912793a222eb24b606a582fd849ab7',
  },
])

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
      :max-amount="3"
      :size="500"
      @error="uploadError"
    />
  </div>
</template>
