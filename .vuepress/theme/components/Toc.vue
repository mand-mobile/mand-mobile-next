<template>
  <div class="md-doc-toc">
    <a-anchor class="md-doc-toc_list">
      <a-anchor-link
        v-for="(item, key) in tocItems"
        class="md-doc-toc_item"
        :class="[`level-${item.level}`]"
        :href="`#${item.slug}`"
        :title="item.title"
        :key="key"
      />
    </a-anchor>
    <!-- <ul class="md-doc-toc_list">
      <li
        v-for="(item, key) in tocItems"
        class="md-doc-toc_item"
        :class="[`level-${item.level}`]"
        :title="item.title"
        :key="key"
      >
        <a class="md-doc-toc_item_link" :href="`#${item.slug}`">{{item.title}}</a>
      </li>
    </ul> -->
  </div>
</template>

<script>
import Anchor from 'ant-design-vue/lib/anchor'
import 'ant-design-vue/lib/anchor/style/index.css'

export default {
  name: 'PageToc',

  props: ['tocItems'],

  components: {
    [Anchor.name]: Anchor,
    [Anchor.Link.name]: Anchor.Link
  }
}
</script>

<style lang="stylus" scoped>
.md-toc, /deep/.ant-anchor-wrapper
  width 8em
.md-doc-toc_item
  list-style none
  &.level-3
    /deep/.ant-anchor-link-title
      font-size 0.7em
      font-weight 300
      color #41485D
/deep/.ant-anchor-wrapper
  padding-left 8px
  .ant-anchor-ink::before
    width 1px
  &::-webkit-scrollbar
    display none
</style>