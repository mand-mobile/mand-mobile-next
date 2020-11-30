<template>
  <li class="md-doc-nav-bar_item" :class="{active: isActive()}">
    <a class="md-doc-nav-bar_item_link" @click="active=!active">{{item.text}}<a-icon type="caret-down" /></a>
    <PopTable v-model="active" class="md-doc-nav-bar_dropdown">
      <template v-for="subitem in item.items">
        <div class="md-doc-nav-bar_subitem" :class="{active: isActive(subitem)}" :key="subitem.link" @click="active=false">
          <RouterLink v-if="!isExternal(subitem.redirect || subitem.link)"
            class="md-doc-nav-bar_item_link"
            :to="subitem.redirect || subitem.link"
          >{{subitem.text}}</RouterLink>
          <a v-else
            class="md-doc-nav-bar_item_link"
            :href="subitem.link"
            target="_blank"
          >{{subitem.text}}</a>
        </div>
      </template>
    </PopTable>
  </li>
</template>

<script>
import Icon from 'ant-design-vue/lib/icon'
import { isExternal } from '../util'
import PopTable from './PopTable'

export default {
  props: {
    item: {
      required: true
    }
  },
  data () {
    return {
      active: false
    }
  },
  components: {
    PopTable,
    [Icon.name]: Icon,
  },
  methods: {
    isExternal,
    isActive (item) {
      const items = item ? [item] : this.item.items
      return items.some(item => {
        const itemPath = item.link
        const pagePath = this.$page.path

        if (isExternal(itemPath)) {
          return false
        }

        if (itemPath === '/') {
          return pagePath === '/'
        }

        return !!~pagePath.indexOf(itemPath)
      })
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
  .md-doc-nav-bar_item_link
    color #111A34 
  .anticon
    margin-left 3px
  &.active
    &::after
      display block
  .md-doc-nav-bar_subitem.active
    .md-doc-nav-bar_item_link
      color $accentColor 

  .md-doc-nav-bar_dropdown
    top 100%
    right 0
    padding 10px 15px
    .md-doc-nav-bar_item_link
      min-width 80px
      display block
      padding 5px 0
      font-size: 14px
      color #111A34 
      &:hover
        color $accentColor 
    
</style>