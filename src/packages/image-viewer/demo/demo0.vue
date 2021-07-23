<script lang="ts">
export default {
  name: 'ImageViewerDemo',
  title: '基本',
}
</script>
<script setup lang="ts">
import { ref } from 'vue'
import MdImageViewer from 'mand-mobile-next/image-viewer'

const dataList = ref([
  {
    dataUrl:
      '//img-hxy021.didistatic.com/static/strategymis/insurancePlatform_spu/uploads/27fb7f097ca218d743f816836bc7ea4a',
  },
  {
    dataUrl:
      '//manhattan.didistatic.com/static/manhattan/insurancePlatform_spu/uploads/c2912793a222eb24b606a582fd849ab7',
  },
])

const visible = ref(false)
</script>

<template>
  <div>
    <md-image-viewer
      v-model:list="dataList"
      v-model:visible="visible"
      :default-index="1"
    ></md-image-viewer>
  </div>
</template>
