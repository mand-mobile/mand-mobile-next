<template>
  <div class="md-image-viewer-box">
    <!-- list -->
    <div class="md-image-list">
      <template
        v-for="(item, index) in dataList"
        :key="index"
      >
        <div
          class="md-image-item preview"
          :style="{
            backgroundImage: `url(${item.dataUrl})`,
            backgroundPosition: 'center center',
            backgroundRepeat: 'no-repeat',
            backgroundSize: 'cover',
          }"
          @click="showViewer(index)"
        >
          <template v-if="deletable">
            <md-tag
              class="md-image-item-del"
              size="small"
              shape="quarter"
              fill-color="#111A34"
              type="fill"
              font-color="#fff"
              @click="onDeleteImage(index)"
            >
              <md-icon name="close"></md-icon>
            </md-tag>
          </template>
        </div>
      </template>
      <slot></slot>
    </div>
    <!--swipper-->
    <md-transition name="md-fade">
      <div
        v-if="isViewerShow"
        class="md-image-viewer"
        @click="closeViewer"
      >
        <div class="md-swipper-warp">
          <md-swiper
            ref="swiper"
            :autoplay="0"
            :default-index="currentImgIndex"
            :has-dots="false"
            :is-prevent="false"
            @after-change="afterChange"
          >
            <div
              v-for="(item, $index) in dataList"
              :key="$index"
              class="md-viewer-item"
            >
              <div class="item">
                <img
                  v-if="!!item.dataUrl"
                  :src="item.dataUrl"
                  :alt="item.dataUrl"
                />
              </div>
            </div>
          </md-swiper>
          <div v-if="hasDots" class="md-viewer-index">
            {{ currentImgIndex + 1 }}/{{ dataList.length }}
          </div>
        </div>
      </div>
    </md-transition>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import MdSwiper from 'mand-mobile-next/swiper'
import MdTag from 'mand-mobile-next/tag'
import MdIcon from 'mand-mobile-next/icon'
import MdTransition from 'mand-mobile-next/transition'
import {
  imageViewerProps,
  useImageViewer,
  emits,
} from './use-image-viewer'

export default defineComponent({
  name: 'MdImageViewer',
  components: {
    MdSwiper,
    MdTag,
    MdIcon,
    MdTransition,
  },
  props: imageViewerProps,
  emits,
  setup(props, context) {
    const {
      currentImgIndex,
      isViewerShow,
      dataList,
      closeViewer,
      showViewer,
      afterChange,
      onDeleteImage,
    } = useImageViewer(props, context)

    return {
      currentImgIndex,
      isViewerShow,
      dataList,

      onDeleteImage,
      closeViewer,
      showViewer,
      afterChange,
    }
  },
})
</script>

<style lang="stylus">
.md-image-list
    display flex
    flex-wrap wrap
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
.md-image-viewer
  position fixed
  top 0
  left 0
  bottom 0
  right 0
  z-index var(--md-image-viewer-zindex)
  transform translate3d(0,0,0)
  overflow hidden
  .md-swipper-warp
    background #000
    display block
    position relative
    height 100%
    .md-swiper-container
      align-items center
      justify-content center
    .md-viewer-item
      width 100%
      .item
        width 100%
        img
          width 100%

  .md-viewer-index
    position absolute
    width 100%
    text-align center
    top 20px
    color #fff
</style>
