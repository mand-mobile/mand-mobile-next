<script lang="ts">
export default {
  name: 'ImageUploaderDemo',
  title: '基本',
}
</script>
<script setup lang="ts">
import { ref } from 'vue'
import MdImageUploader from 'mand-mobile/image-uploader'
import { Toast } from 'mand-mobile/toast'

const fileList = ref([
  {
    dataUrl:
      '//img-hxy021.didistatic.com/static/strategymis/insurancePlatform_spu/uploads/27fb7f097ca218d743f816836bc7ea4a',
  },
  {
    dataUrl:
      '//manhattan.didistatic.com/static/manhattan/insurancePlatform_spu/uploads/c2912793a222eb24b606a582fd849ab7',
  },
])

const complete = () => {}
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
      :max-size="500"
      @complete="complete"
      @error="uploadError"
    />
  </div>
</template>
