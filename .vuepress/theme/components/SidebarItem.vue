<template>
  <li class="md-doc-sidebar_item" :class="{active, grouped}" role="menuitem">
    <router-link v-if="href" :to="href" class="md-doc-sidebar_item_link">
      <SidebarItemText :title="item.title"/>
    </router-link>
    <SidebarItemText class="md-doc-sidebar_item_category" v-else :title="item.title"/>
    <slot/>
  </li>
</template>

<script>
import SidebarItemText from './SidebarItemText'
export default {
  props: ['item', 'grouped'],
  components: {
    SidebarItemText
  },
  computed: {
    href () {
      return this.item.path || ''
    },
    active () {
      return this.$page.path === this.href
    }
  }
}
</script>

<style lang="stylus" scoped>
.md-doc-sidebar_item
  list-style none
  border-radius 2.6em
  &_link
    display block
    transition all .3s
    &:hover
      transform translateX(2px)
      /deep/.md-doc-sidebar_item_text
        color #2f86f6
  &_category
    font-weight bold
  &.grouped
    >.md-doc-sidebar_item_link
      color #2f86f6
    &.level-0
      margin-top 1em
    // &.level-1
    //   margin-top .5em
  &.active
    pointer-events none
    background rgba(47, 134, 246, .03)
    /deep/.md-doc-sidebar_item_text
      color #2f86f6
  &.level-2
    font-size .95em
</style>