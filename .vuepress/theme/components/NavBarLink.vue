<template>
  <li class="md-doc-nav-bar_item" :class="{active: isActive(item)}">
    <RouterLink class="md-doc-nav-bar_item_link" v-if="!isExternal(item.redirect || item.link)"
      :to="item.redirect || item.link"
    >{{item.text}}</RouterLink>
    <a v-else
      class="md-doc-nav-bar_item_link"
      :href="item.link"
      target="_blank"
    >{{item.text}}<a-icon type="link" /></a>
  </li>
</template>

<script>
import Icon from 'ant-design-vue/lib/icon'
import { isExternal } from '../util'

export default {
  props: {
    item: {
      required: true
    }
  },
  components: {
    [Icon.name]: Icon,
  },
  methods: {
    isExternal,
    isActive (item) {
      const itemPath = item.link
      const pagePath = this.$page.path

      if (isExternal(itemPath)) {
        return false
      }

      if (itemPath === '/') {
        return pagePath === '/'
      }

      return !!~pagePath.indexOf(itemPath)
    }
  }
}
</script>

<style lang="stylus">
.md-doc-nav-bar_item
  position relative
  display flex
  align-items center
  height 100%
  padding 0 1.5em
  list-style none
  &.active
    &::after
      display block
    >.md-doc-nav-bar_item_link
      color $accentColor
  >.md-doc-nav-bar_item_link
    color #111A34 
    &:hover
      color $accentColor 
    .anticon
      margin-left .5em
      font-size .8em
      color #aaa
  &::after
    display none
    content ""
    position absolute
    bottom 6px
    left 50%
    width 1.6em
    height 4px
    margin-left -.8em
    background $accentColor
    border-radius 3px
</style>