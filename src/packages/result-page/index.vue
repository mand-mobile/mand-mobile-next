<template>
  <div class="md-result">
    <div class="md-result-image">
      <img :src="actualImgUrl" :class="!imgUrl && type" />
    </div>
    <div v-if="actualText" class="md-result-text">
      {{ actualText }}
    </div>
    <div v-if="actualSubText" class="md-result-subtext">
      {{ actualSubText }}
    </div>
    <div v-if="buttons.length" class="md-result-buttons">
      <md-button
        v-for="(button, index) of buttons"
        :key="index"
        :type="button.type"
        :plain="button.plain === undefined || button.plain"
        :round="button.round"
        :inactive="button.inactive"
        :loading="button.loading"
        :icon="button.icon"
        :icon-svg="button.iconSvg"
        size="small"
        inline
        @click="button.handler"
      >
        {{ button.text }}
      </md-button>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, PropType } from 'vue'
import { t } from 'mand-mobile/locale'
import MdButton from 'mand-mobile/button'

export default defineComponent({
  name: 'MdResultPage',
  components: { MdButton },
  props: {
    type: {
      type: String,
      default: 'empty',
    },
    imgUrl: {
      type: String,
      default: '',
    },
    text: {
      type: String,
      default: '',
    },
    subtext: {
      type: String,
      default: '',
    },
    buttons: {
      type: Array as PropType<
        Array<{
          type?: any
          plain?: boolean
          round?: boolean
          inactive?: boolean
          iconSvg?: boolean
          loading?: boolean
          icon?: string
          handler?: () => void
          text: string
        }>
      >,
      default: () => {
        return []
      },
    },
  },
  setup(props) {
    const actualImgUrl = computed(() => {
      const pre =
        '//manhattan.didistatic.com/static/manhattan/mand-mobile/result-page/2.1/'
      return props.imgUrl || `${pre}${props.type}.png`
    })

    const actualText = computed(() => {
      return (
        props.text ||
        {
          // 网络连接异常
          network: t('md.result_page.networkError'),
          // 暂无信息
          empty: t('md.result_page.noInformation'),
        }[props.type] ||
        ''
      )
    })

    const actualSubText = computed(() => {
      return (
        props.subtext ||
        {
          // 您要访问的页面已丢失
          lost: t('md.result_page.lostWay'),
        }[props.type] ||
        ''
      )
    })

    return { actualImgUrl, actualText, actualSubText }
  },
})
</script>

<style lang="stylus">
@import './index.styl'

.md-result
  display flex
  align-items center
  justify-content center
  flex-direction column
  width 100%
  height 100%
  text-align center

.md-result-image
  width var(--md-result-page-image-size)
  img
    width 100%
    margin-bottom 40px

.md-result-text
  margin 20px 20px 0
  color var(--md-result-page-title-color)
  font-size var(--md-result-page-title-font-size)

.md-result-subtext
  margin-top 16px
  color var(--md-result-page-describe-color)
  font-size var(--md-result-page-describe-font-size)

.md-result-buttons
  display flex
  .md-button
    margin 10px
</style>
