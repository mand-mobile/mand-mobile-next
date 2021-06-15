<template>
  <md-popup
    v-model="popupShow"
    class="md-landscape"
    :class="{ 'is-full': fullScreen }"
    :mask-closable="maskClosable"
    prevent-scroll
    :prevent-scroll-exclude="content"
    :has-mask="!fullScreen && hasMask"
    :transition="currentTransition"
    @show="onShow"
    @hide="onHide"
  >
    <div class="md-landscape-body" :class="{ scroll }">
      <div ref="content" class="md-landscape-content">
        <slot></slot>
      </div>
      <md-icon
        class="md-landscape-close"
        :class="{ dark: !hasMask || fullScreen }"
        :name="fullScreen ? 'clear' : 'close'"
        @click="hidePage"
      />
    </div>
  </md-popup>
</template>

<script lang="ts">
import { computed, defineComponent, ref } from 'vue'
import MdIcon from 'mand-mobile/Icon'
import MdPopup from 'mand-mobile/popup'
import {
  HIDE_EVENT,
  SHOW_EVENT,
  UPDATE_MODEL_EVENT,
} from 'mand-mobile/utils'

export default defineComponent({
  name: 'MdLandscape',
  components: { MdIcon, MdPopup },
  props: {
    modelValue: {
      type: Boolean,
      default: false,
    },
    scroll: {
      type: Boolean,
      default: false,
    },
    fullScreen: {
      type: Boolean,
      default: false,
    },
    hasMask: {
      type: Boolean,
      default: true,
    },
    maskClosable: {
      type: Boolean,
      default: false,
    },
    transition: {
      type: String,
      default: '',
    },
  },
  emits: [UPDATE_MODEL_EVENT, HIDE_EVENT, SHOW_EVENT],
  setup(props, { emit }) {
    const onHide = () => {
      emit(HIDE_EVENT)
      hidePage()
    }
    const onShow = () => {
      emit(SHOW_EVENT)
    }
    const hidePage = () => {
      emit(UPDATE_MODEL_EVENT, false)
    }
    const popupShow = computed({
      get: () => props.modelValue,
      set: () => hidePage(),
    })

    const content = ref<HTMLElement | undefined>(undefined)

    const currentTransition = computed(() => {
      if (props.transition) return props.transition
      return props.fullScreen ? 'md-fade' : 'md-punch'
    })

    return {
      popupShow,
      onHide,
      onShow,
      hidePage,
      content,

      currentTransition,
    }
  },
})
</script>

<style lang="stylus">
.md-landscape
  &.is-full
    .md-popup-box
      position absolute
      absolute-pos()
    .md-landscape-body
      width 100%
      height 100%
      background landscape-fullscreen-bg
    .md-landscape-content
      width 100%
      height 100%
      overflow auto
      -webkit-overflow-scrolling touch
    .md-icon.md-landscape-close
      position absolute
      right 25px
      top 25px
      margin auto

  .md-popup, .md-popup-box
    z-index landscape-zindex

  .md-icon.md-landscape-close
    position relative
    display block
    margin 50px auto 20px auto
    font-size 50px
    width 50px
    height 50px
    line-height 50px
    text-align center
    color color-text-base-inverse
    &.dark
      color color-text-base
      opacity 0.5

.md-landscape-content
  width landscape-width
  font-size font-body-large
  overflow auto
  -webkit-overflow-scrolling touch
  box-sizing border-box
  img
    max-width 100%
    height auto
</style>