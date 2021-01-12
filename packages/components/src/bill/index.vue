<template>
  <md-water-mark
    class="md-bill"
    :content="waterMarkProps.content"
    :styles="waterMarkProps.styles"
  >
    <header class="md-bill_header">
      <template v-if="!$slots.header">
        <h4 class="md-bill_title" v-if="title" v-text="title"></h4>
        <div class="md-bill_no" v-if="no">NO.{{no}}</div>
      </template>
      <template v-else>
        <slot name="header"></slot>
      </template>
    </header>
    <div class="md-bill_neck">
      <span class="md-bill_neck_border"></span>
      <template v-if="neckNotch">
        <em class="md-bill_neck_notch md-left" :style="{background: `${neckNotch}`}"></em>
        <em class="md-bill_neck_notch md-right" :style="{background: `${neckNotch}`}"></em>
      </template>
    </div>
    <div class="md-bill_content">
      <div class="md-bill_detail">
        <slot></slot>
      </div>
      <footer v-if="$slots.footer" class="md-bill-footer">
        <slot name="footer"></slot>
      </footer>
      <!-- <template #watermark="{ coord }">
        <slot name="watermark" :coord="coord"/>
      </template> -->
    </div>
  </md-water-mark>
</template>

<script>
import FieldItem from '../field/item'
import WaterMark from '../water-mark'

export default {
  name: 'md-bill',

  components: {
    'md-field-item': FieldItem,
    'md-water-mark': WaterMark,
  },

  props: {
    title: {
      type: String,
      default: '',
    },
    no: {
      type: [String, Number],
      default: '',
    },
    waterMark: {
      type: [String, Object],
      default: '',
    },
    neckNotch: {
      type: String,
      default: '#F3F4F5',
    },
    styles: {
      type: Object,
      default: {},
    },
  },
  computed: {
    waterMarkProps() {
      const {waterMark} = this
      return typeof waterMark === 'string' ? {content: waterMark} : waterMark
    },
  },
}

</script>

<style lang="stylus">
.md-bill
  position relative
  background md-bill-bg

  .md-bill_header
    display flex
    align-items center
    justify-content space-between
    padding 28px 32px 8px

    .md-bill_title
      color md-bill-name-color
      font-size md-bill-name-font-size
      font-weight md-font-weight-medium
      font-family Songti SC

    .md-bill_no
      color md-bill-no-color
      font-size md-bill-no-font-size

  .md-bill_neck
    position relative
    height 36px
    padding 10px
    margin 0 28px
    box-sizing border-box
    &_border
      position absolute
      top 50%
      left 10px
      right 10px
      display block
      height 2px
      border-top dashed 2px md-color-border-element
    &_notch
      content ''
      position absolute
      top 0
      width 36px
      height 36px
      border-radius 18px
      &.md-left
        left -46px
      &.md-right
        right -46px


  .md-bill_content
    padding 0 32px 20px 32px

    .md-bill_detail
      padding-bottom 40px
</style>
