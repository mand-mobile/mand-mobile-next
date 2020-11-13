<template>
  <div id="global-layout">
    <MDHeader />
    <div class="content">
      <component :is="layout"/>
    </div>
    <MDFooter/>
  </div>
</template>

<script>
import MDHeader from '../components/Header'
import MDFooter from '../components/Footer'

export default {
  components: {
    MDHeader,
    MDFooter
  },
  computed: {
    layout () {
      if (this.$page.path) {
        if (this.$frontmatter.layout) {
          // 你也可以像默认的 globalLayout 一样首先检测 layout 是否存在
          return this.$frontmatter.layout
        }
        return 'Layout'
      }
      return 'NotFound'
    },
  },
  mounted () {
    // if (document.documentElement.clientWidth > 750) {
    //   setScale(0.5)
    // }
    // console.log(this.$route)
    // console.log(this.$page)
    // console.log(this.$site)
  }
}
</script>

<style lang="stylus" scoped>
.content
  min-height 100vh
</style>