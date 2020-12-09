<template>
  <div class="md-doc-layout">
    <div class="md-doc-layout_sidebar">
      <Sidebar v-bind="{ sidebarItems }" />
    </div>
    <div class="md-doc-layout_content">
      <div class="md-doc-layout_content_header" v-if="title">
        <p class="md-doc-layout_content_header_title" v-text="title"></p>
        <MDPlatformTag class="md-doc-layout_content_header_tag large" v-bind="{ platforms }"/>
      </div>
      <div class="md-doc-layout_content_main">
        <Content />
      </div>
      <Contributors :fileName="$page.relativePath" :owner="repo[1]" :repo="repo[2]"/>
      <PageNav v-bind="{ sidebarItems }" />
      <PageToc
        v-if="hasToc"
        class="md-doc-layout_content_toc"
        v-bind="{ tocItems }"
      />
    </div>
  </div>
</template>

<script>
import Sidebar from '../components/Sidebar'
import PageToc from '../components/Toc'
import PageNav from '../components/PageNav'
import Contributors from '../components/Contributors'
// import PlatformTag from '../components/PlatformTag'
import { resolveSidebarItems } from '../util'

export default {
  components: {
    Sidebar,
    PageToc,
    PageNav,
    Contributors
    // PlatformTag
  },
  // watch:{
  //   $route(to,from){
  //     console.log(to.path);
  //   }
  // },
  computed: {
    hasToc () {
      return this.$page.frontmatter.toc !== 'hidden'
    },
    tocItems () {
      return this.$page.headers
    },
    sidebarItems () {
      return resolveSidebarItems(
        this.$page,
        this.$page.path,
        this.$site,
        this.$localePath
      )
    },
    title () {
      if (this.$page.frontmatter.hasOwnProperty('no-title')) {
        return
      }
      return this.$page.title
    },
    repo () {
      return ((this.$themeConfig.repo || '')
        .match(/^(https?:\/\/)([0-9a-z\-.]+)(:[0-9]+)?([/0-9a-z\-.]+)?(\?[0-9a-z\-&=]+)?(#[0-9-a-z\-]+)?/i)[4] || '')
        .split('/')
    },
    platforms () {
      const platform = this.$page.meta.platform || (this.$page.meta.category ? ['web', 'uni'] : '')
      return Array.isArray(platform) ? platform : [platform]
    }
  }
}
</script>

<style lang="stylus" scoped>
.md-doc-layout
  &_sidebar
    position relative
    float left
    width 16.666%
    z-index 2
  &_content
    position relative
    max-width 1800px
    margin 0 auto
    padding 0 14em 0 5em
    overflow hidden
    &_header
      display flex
      &_title
        display inline
        margin-bottom 0
        font-size 2.2rem
        font-weight 500
        color #1f2f3d
      &_tag
        margin-left auto
        align-items center
    &_main
      min-height calc(100vh - 16em)
      padding-bottom 5em
    &_toc
      position absolute
      top 1em
      right 2em

@media (max-width: 1500px)
  .md-doc-layout_content
    max-width 1200px
    padding 1em 5em 0 5em
  .md-doc-layout_content_toc
    display none
@media (max-width: 1000px)
  .md-doc-layout_content
    padding 1em 1.5em 0 1.5em
  .md-doc-layout_sidebar
    display none
@media (max-width: 750px)
  .md-doc-layout_content_main
    font-size .9em
  .md-doc-layout_content_header
    display block !important
</style>

<style lang="stylus">
.dark
  .md-doc-layout_content_header_title
    color #f5f6f7
</style>