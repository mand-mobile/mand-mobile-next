<template>
  <div class="md-example-child md-example-child-tag md-example-child-tag-0">
    <md-tag class="md-tag" size="tiny" shape="circle" type="fill" fill-color="#FC7353" font-color="#000"></md-tag>
    <md-tag class="md-tag" size="small" shape="circle" type="fill" fill-color="#FC7353" font-color="#fff">特惠</md-tag>
    <md-tag class="md-tag" size="large" shape="circle" type="fill" fill-color="#FC7353" font-color="#fff">返5000</md-tag>
    <md-tag class="md-tag" size="small" shape="circle" type="ghost" font-color="#FC7353">特惠</md-tag>
    <md-tag
      class="md-tag"
      size="small"
      shape="circle"
      sharp="bottom-left"
      type="fill"
      fill-color="linear-gradient(90deg, #FC7353 0%, #FC9153 100%)"
      font-color="#fff"
    >续保3折起</md-tag>
  </div>
</template>

<script>
import Tag from 'mand-mobile/lib/tag'

export default {
  components: {
    'md-tag': Tag,
  },
}
// #region ignore
export const metaInfo = {
  'zh-CN': {
    title: '半圆',
  },
  'en-US': {
    title: 'Semicircle',
  },
}
// #endregion ignore

</script>

<style lang="stylus">
.md-tag
  display inline-block
  margin-left 16px
</style>
