<template>
  <div class="md-example-child md-example-child-tag md-example-child-tag-2">
    <md-tag class="md-tag" size="large" shape="square" font-color="#FF8843" type="ghost">可选</md-tag>
    <md-tag class="md-tag" size="small" shape="square" font-color="#28AA91" type="ghost">可选</md-tag>
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
    title: '线框',
  },
  'en-US': {
    title: 'Square',
  },
}
// #endregion ignore

</script>

<style lang="stylus">
.md-tag
  display inline-block
  margin-left 16px
</style>
