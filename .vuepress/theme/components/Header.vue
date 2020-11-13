<template>
  <div class="md-doc-header">
    <a :href="$site.base" class="md-doc-header_aside">
      <img class="md-doc-header_aside_logo" :src="$site.themeConfig.logo" alt="logo">
      <p class="md-doc-header_aside_title" v-text="$site.title"></p>
    </a>
    <SearchBox class="md-doc-header_search"/>
    <NavBar v-bind="{ navItems }" />
    <!-- <VersionBox /> -->
  </div>
</template>

<script>
import SearchBox from '@SearchBox'
import NavBar from './NavBar'
import VersionBox from './VersionBox'
import { resolveNavItems } from '../util'

export default {
  components: {
    NavBar,
    // VersionBox,
    SearchBox
  },
  computed: {
    navItems () {
      return resolveNavItems(this.$site, this.$localePath)
    }
  }
}
</script>

<style lang="stylus" scoped>
.md-doc-header
  position relative
  // z-index 2
  display flex
  height 4em
  margin-bottom 2em
  // border-bottom 1px solid #f0f1f2
  &_aside
    display flex
    align-items center
    width 16.666%
    height 100%
    padding-left 2.5em
    box-sizing border-box
    &_logo
      display inline-block
      margin-right .8em
      width auto
      height 1.8em
      transition all .3s
    &_title
      display inline-flex
      flex-direction column
      justify-content center
      height 100%
      margin 0
      color #333
      font-size 1.4em
      font-family DINAlternate-Bold,AvenirNext-Medium,Microsoft Yahei,Lato,Lucida Grande,Lucida Sans Unicode,Lucida Sans,Verdana,Tahoma,sans-serif
  /deep/.search-box
    display flex
    align-items center
    input
      width 15em
      border-color #E2E4EA
    .suggestions
      top 3.2em
      border-color #E2E4EA
      z-index 3
      .suggestion
        font-size .9em
@media (max-width: 1500px)
  .md-doc-header_aside_logo
    height 1.8em
  .md-doc-header_aside_title
    font-size 1em
@media (max-width: 1000px)
  .md-doc-header_aside
    width 36%
    padding-left 1.5em
  .md-doc-header_aside_title
    display none
  /deep/.md-doc-nav-bar
    display none
  /deep/.search-box
    margin-left auto
    margin-right 1.5em
    input
      width 12em !important
      left 0 !important
</style>