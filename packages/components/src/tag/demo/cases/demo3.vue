<template>
  <div class="md-example-child md-example-child-tag md-example-child-tag-3">
    <tag class="md-tag" size="large" shape="square" fill-color="rgba(0,0,0,0)" type="fill" font-weight="bolder" font-color="#333">￥3600</tag>
    <tag class="md-tag" size="small" shape="square" fill-color="rgba(0,0,0,0)" type="fill" font-weight="bolder" font-color="#333">￥300</tag>
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
    title: '阳文',
  },
  'en-US': {
    title: 'Characters cut in relief',
  },
}
// #endregion ignore

</script>

<style lang="stylus">
.md-tag
  display inline-block
  margin-left 16px
</style>
