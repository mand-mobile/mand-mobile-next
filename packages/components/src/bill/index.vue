<template>
  <div class="md-bill">
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
      <span></span>
    </div>
    <div class="md-bill_content">
      <div class="md-bill_detail">
        <slot></slot>
      </div>
      <footer v-if="$slots.footer" class="md-bill-footer">
        <slot name="footer"></slot>
      </footer>
    </div>
  </div>
  
</template>

<script>
import FieldItem from '../field/item'
// import WaterMark from '../water-mark'

export default {
  name: 'md-bill',

  components: {
    'md-field-item': FieldItem,
    // [WaterMark.name]: WaterMark,
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
      type: String,
      default: '',
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
    span
      position absolute
      top 50%
      left 10px
      right 10px
      display block
      height 1px
      border-top dashed 1px md-color-border-element

  .md-bill_content
    padding 0 32px 20px 32px

    .md-bill_detail
      padding-bottom 40px
</style>
