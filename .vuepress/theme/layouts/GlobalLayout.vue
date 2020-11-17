<template>
  <div id="global-layout" :class="{'is-home': isHome}">
    <MDHeader />
    <div class="content">
      <component :is="layout"/>
    </div>
    <MDFooter :data="footerData"/>
  </div>
</template>

<script>
import Home from './Home'
import MDHeader from '../components/Header'
import MDFooter from '../components/Footer'

export default {
  provide() {
    return {
      isHome: this.isHome,
    }
  },
  components: {
    Home,
    MDHeader,
    MDFooter
  },
  data () {
    return {
      headerData: {},
      footerData: {},
    }
  },
  computed: {
    isHome: {
      get () {
        return this.$page.path === '/'
      },
      cache: false
    },
    layout () {
      if (this.$page.path) {
        if (this.isHome) {
          return 'Home'
        }
        if (this.$frontmatter.layout) {
          // 你也可以像默认的 globalLayout 一样首先检测 layout 是否存在
          return this.$frontmatter.layout
        }
        return 'Layout'
      }
      return 'NotFound'
    },
  },
  async mounted () {
    const {header, footer} = await this.getSiteConfig()
    this.headerData = header
    this.footerData = footer
  },
  methods: {
    async getSiteConfig () {
      const url = `http://star.xiaojukeji.com/config/get.node?city=-1&areaid=&name=mand_mobile_3_config`
      const data = await fetch(url)
        .then(res => res.json())
        .catch(e => console.log(e))
      if (!data) {
        return {}
      }
      return data.data.mand_mobile_3_config
    }
  }
}
</script>

<style lang="stylus" scoped>
.content
  min-height 100vh
.is-home
  >>>.md-doc-footer
    padding 0 10em
</style>