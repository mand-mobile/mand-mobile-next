<template>
  <li class="md-doc-sidebar_item" :class="{active, grouped}" role="menuitem">
    <router-link v-if="href" :to="href" class="md-doc-sidebar_item_link">
      <SidebarItemText :title="item.title"/>
    </router-link>
    <a v-else-if="item.link" :href="item.link" target="_blank" class="md-doc-sidebar_item_link">
      <SidebarItemText :title="item.title">
        <a-icon type="link" />
      </SidebarItemText>
    </a>
    <SidebarItemText class="md-doc-sidebar_item_category" v-else :title="item.title"/>
    <slot/>
  </li>
</template>

<script>
import Icon from 'ant-design-vue/lib/icon'
import SidebarItemText from './SidebarItemText'
export default {
  props: ['item', 'grouped'],
  components: {
    [Icon.name]: Icon,
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
  font-family DINAlternate, AvenirNext-Medium, Microsoft Yahei, Lato, Lucida Grande, Lucida Sans Unicode, Lucida Sans, Verdana, Tahoma, sans-serif
  &_link
    display block
    transition all .3s
    &:hover
      // transform translate3d(2px, 0, 0)
      /deep/.md-doc-sidebar_item_text
        color $accentColor
    .anticon
      margin-left .3em
      color #aaa
  &_category
    font-weight bold
    font-size 1.2em
    font-family DINAlternate-Bold, AvenirNext-Medium, Microsoft Yahei, Lato, Lucida Grande, Lucida Sans Unicode, Lucida Sans, Verdana, Tahoma, sans-serif
  &.grouped
    >.md-doc-sidebar_item_link
      color $accentColor
    &.level-0
      margin-top 1em
    // &.level-1
    //   margin-top .5em
  &.active
    pointer-events none
    background rgba(47, 134, 246, .03)
    /deep/.md-doc-sidebar_item_text
      color $accentColor
  &.level-2
    font-size .95em
</style>

<style lang="stylus">
.dark
  .md-doc-sidebar_item_category
    color #f5f6f7 
  .md-doc-sidebar_item.active
    background rgba(47, 134, 246, .1)
</style>