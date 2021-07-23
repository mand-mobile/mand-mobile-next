<script lang="ts">
export default {
  name: 'ImageReaderDemo',
  title: '基本',
}
</script>
<script setup lang="ts">
import { reactive } from 'vue'
import MdTag from 'mand-mobile-next/tag'
import MdIcon from 'mand-mobile-next/icon'
import Toast from 'mand-mobile-next/toast'
import MdImageReader from 'mand-mobile-next/image-reader'

const imageList = reactive<{
  reader0: string[]
  [key: string]: any[]
}>({
  reader0: [
    '//img-hxy021.didistatic.com/static/strategymis/insurancePlatform_spu/uploads/27fb7f097ca218d743f816836bc7ea4a',
    '//manhattan.didistatic.com/static/manhattan/insurancePlatform_spu/uploads/c2912793a222eb24b606a582fd849ab7',
  ],
})

const onDeleteImage = (name: string, index: number) => {
  const demoImageList = imageList[name] || []
  demoImageList.splice(index, 1)
  imageList[name] = demoImageList
}

const onReaderSelect = (data: { files: File[] }) => {
  data.files.forEach((item) => {
    console.log(
      '[Mand Mobile] ImageReader Selected:',
      'File Name ' + item.name
    )
  })
  Toast.loading('图片读取中...')
}

const onReaderComplete = (result: {
  dataUrl: string
  file: File
}) => {
  if (result.dataUrl) {
    const demoImageList = imageList['reader0'] || []
    demoImageList.push(result.dataUrl)
  }
  Toast.hide()
}

const onReaderError = (data: { msg: string }) => {
  Toast.failed(data.msg)
}
</script>

<template>
  <div
    class="
      md-example-child
      md-example-child-reader
      md-example-child-reader-0
    "
  >
    <ul class="image-reader-list">
      <li
        v-for="(img, index) in imageList['reader0']"
        :key="index"
        class="image-reader-item"
        :style="{
          backgroundImage: `url(${img})`,
          backgroundPosition: 'center center',
          backgroundRepeat: 'no-repeat',
          backgroundSize: 'cover',
        }"
      >
        <md-tag
          class="image-reader-item-del"
          size="small"
          shape="quarter"
          fill-color="#111A34"
          type="fill"
          font-color="#fff"
          @click="onDeleteImage('reader0', index)"
        >
          <md-icon name="close"></md-icon>
        </md-tag>
      </li>
      <li class="image-reader-item add">
        <md-image-reader
          name="reader0"
          is-multiple
          @select="onReaderSelect"
          @complete="onReaderComplete"
          @error="onReaderError"
        ></md-image-reader>
        <md-icon
          name="camera"
          size="md"
          color="#CCC"
        ></md-icon>
        <p>添加图片</p>
      </li>
    </ul>
  </div>
</template>

<style lang="stylus">
.md-example-child-reader
  .image-reader-list
    float left
    width 100%
    .image-reader-item
      position relative
      float left
      width 23.5%
      padding-bottom 23.5%
      margin-bottom 2%
      margin-right 2%
      background #FFF
      box-shadow 0 5px 20px rgba(197, 202, 213, .25)
      box-sizing border-box
      list-style none
      border-radius 4px
      background-size cover
      overflow hidden
      &:nth-of-type(4n)
        margin-right 0
      &.add
        .md-icon
          position absolute
          top 40%
          left 50%
          transform translate(-50%, -50%)
          opacity .5
        p
          position absolute
          top 50%
          left 0
          width 100%
          margin-top 15px
          font-size 22px
          color #CCC
          text-align center
      .image-reader-item-del
        position absolute
        top 0
        right 0
        z-index 3
        opacity .8
        .md-icon-close
          font-size 24px
</style>
