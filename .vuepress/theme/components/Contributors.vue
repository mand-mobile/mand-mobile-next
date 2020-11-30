<template>
  <div class="md-doc-contributors">
    <ul class="md-doc-contributors-list">
      <a-tooltip v-for="item in ctb" :key="item.username">
        <template slot="title">文档贡献者：{{item.username}}</template>
        <li class="md-doc-contributors-list-item">
          <a :href="`https://github.com/${item.username}`">
            <img :src="getAvatarLink(item.url)" alt="">
          </a>
        </li>
      </a-tooltip>
    </ul>
    <a :href="editLink" class="md-doc-contributors-edit" target="_blank">在GitHub上编辑此页</a>
  </div>
</template> 

<script>
import Tooltip from 'ant-design-vue/lib/tooltip'
import 'ant-design-vue/lib/tooltip/style/index.css'

export default {
  components: {
    [Tooltip.name]: Tooltip,
  },
  props: {
    owner: {
      default: 'mand-mobile'
    },
    repo: {
      default: 'mand-mobile-next'
    },
    fileName: {
      default: '/packages/components/src/button/README.md'
    }
  },
  data() {
    return {
      ctb: []
    }
  },
  computed: {
    editLink() {
      return `https://github.com/${this.owner}/${this.repo}/edit/master/${this.fileName}`
    }
  },
  mounted () {
    this.getAvatarList(this.$props)
    .then(data => {
      console.log(data)
      this.ctb = data
    })
  },
  methods: {
    async getAvatarList ({
      fileName,
      repo,
      owner,
    }) {
      const url = `https://proapi.azurewebsites.net/doc/getAvatarList?filename=${fileName}&owner=${owner}&repo=${repo}`
      const data = await fetch(url, { mode: 'cors' })
        .then(res => res.json())
        .catch(e => console.log(e))
      if (!data) {
        return []
      }
      return data
    },
    getAvatarLink(link) {
      if (!link) {
        return
      }
      const [base] = link.split('?')
      return `${base}?s=200`
    }
  }
}
</script>

<style lang="stylus" scoped>
.md-doc-contributors
  display flex
  justify-content space-between
  border-bottom solid 1px #ebebeb
  padding-bottom 2em
  &-list
    display inline-flex
    margin-right 2em
    padding-left 0
    margin-bottom 0
    &-item
      display inline-flex
      width 1.8em
      height 1.8em
      margin-bottom .5em
      margin-right .5em
      border-radius 50%
      overflow hidden
      list-style none
      a, img
        display block
        width 100%
        height 100%
</style>