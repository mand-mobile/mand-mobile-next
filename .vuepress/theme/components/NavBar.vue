<template>
  <ul class="md-doc-nav-bar">
    <template v-for="(item, key) in navItems">
      <li class="md-doc-nav-bar_item" :class="{active: isActive(item)}" :key="key">
        <RouterLink v-if="!isExternal(item.redirect || item.link)"
          :to="item.redirect || item.link"
        >{{item.text}}</RouterLink>
        <a v-else
          :href="item.link"
          target="_blank"
        >{{item.text}}</a>
      </li>
    </template>
  </ul>
</template>

<script>
import { isExternal } from '../util'

export default {
  props: ['navItems'],
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
.md-doc-nav-bar
  display flex
  justify-content flex-end
  align-items center
  height 100%
  margin-left auto
  margin-bottom 0
  padding-right 2.5em
  box-sizing border-box
  &_item
    position relative
    display flex
    align-items center
    height 100%
    padding 0 1.5em
    list-style none
    &.active
      &::after
        display block
      a
        color #2F86F6
    a
      color #111A34 
    &::after
      display none
      content ""
      position absolute
      bottom 0
      left 50%
      width 1em
      height 3px
      margin-left -.5em
      background #2F86F6
</style>