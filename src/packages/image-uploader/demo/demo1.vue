<script lang="ts">
export default {
  name: 'ImageUploaderDemo',
  title: '禁止添加',
}
</script>
<script setup lang="ts">
import { ref, reactive } from 'vue'
import MdImageUploader from 'mand-mobile/image-uploader'
const fileList = ref([
  {
    dataUrl:
      '//img-hxy021.didistatic.com/static/strategymis/insurancePlatform_spu/uploads/27fb7f097ca218d743f816836bc7ea4a',
  },
])

const complete = () => {}
</script>

<template>
  <div>
    <md-image-uploader
      v-model="fileList"
      :max-size="500"
      disabled
      @select="complete"
    />
  </div>
</template>
