<template>
  <div class="md-example-child md-example-child-tag md-example-child-tag-2">
    <tag class="md-tag" size="large" shape="square" font-color="#FF8843" type="ghost">可选</tag>
    <tag class="md-tag" size="small" shape="square" font-color="#28AA91" type="ghost">可选</tag>
  </div>
</template>

<script>
import Tag from '../../index'

export default {
  name: 'tag-demo',
  /* DELETE */
  title: '线框',
  titleEnUS: 'Square',
  /* DELETE */
  components: {
    Tag,
  },
}

</script>

<style lang="stylus">
.md-tag
  display inline-block
  margin-left 16px
</style>
