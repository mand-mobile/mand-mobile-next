<template>
  <div class="md-example-child md-example-child-tag md-example-child-tag-3">
    <md-tag
      class="md-tag"
      size="large"
      shape="coupon"
      fill-color="#FC9153"
      type="fill"
      font-color="#fff"
      style="margin-right:20px;"
    >免息券70.1</md-tag>
    <md-tag
      class="md-tag"
      size="large"
      shape="quarter"
      fill-color="#FC9153"
      type="fill"
      font-color="#fff"
      style="margin-right:20px;"
    >
      <md-icon name="right"></md-icon>
    </md-tag>
    <md-tag
      size="large"
      shape="bubble"
      fill-color="linear-gradient(90deg, #FF5B60 0%, #F98472 100%)"
      type="fill"
    >99</md-tag>
  </div>
</template>

<script>
import Tag from 'mand-mobile/lib/tag'
import Icon from 'mand-mobile/lib/icon'

export default {
  components: {
    'md-tag': Tag,
    'md-icon': Icon,
  },
}
// #region ignore
export const metaInfo = {
  'zh-CN': {
    title: '特殊标签',
  },
  'en-US': {
    title: 'Special tags',
  },
}
// #endregion ignore

</script>

<style lang="stylus">
.md-tag
  display inline-block
  margin-left 16px
</style>
