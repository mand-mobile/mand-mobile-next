<template>
  <div class="md-doc-demo">
    <header class="md-doc-demo_header">
      <section class="md-doc-demo_header_main">
        <p class="md-doc-demo_header_title" v-if="getMetaInfo('title')" v-html="getMetaInfo('title')"></p>
        <p class="md-doc-demo_header_desc" v-if="getMetaInfo('describe')" v-html="getMetaInfo('describe')"></p>
      </section>
      <section class="md-doc-demo_header_ext">
        <MDPlatformTag v-bind="{platforms: [getMetaInfo('platform')]}" class="large"/> 
        <!-- <a-tooltip v-if="platform">
          <template slot="title">仅用于{{platform}}</template>
          <em class="md-doc-demo_header_ext_tag">{{platform}}</em>
        </a-tooltip> -->
      </section>
    </header>
    <div class="md-doc-demo_content">
      <div v-if="dynamicComponent" class="md-doc-demo_content_case" :style="{height: getMetaInfo('height') ? `${getMetaInfo('height')}px` : 'auto'}">
        <ClientOnly>
          <component :is="dynamicComponent" :style="{ zoom }"/>
        </ClientOnly>
      </div>
      <a-skeleton v-else active :title="false" />
    </div>
    <div class="md-doc-demo_code">
      <ul class="md-doc-demo_code_tab">
        <!-- <li class="md-doc-demo_code_tab_btn">
          <a href="javascript:void(0)">
            <a-icon type="edit" />
          </a>
        </li> -->
        <a-tooltip>
          <template slot="title">Copy Code</template>
          <li class="md-doc-demo_code_tab_btn">
            <a href="javascript:void(0)">
              <a-icon type="copy" />
            </a>
          </li>
        </a-tooltip>
        <a-tooltip>
          <template slot="title">{{isCodeShow ? 'Close Code' : 'Show Code'}}</template>
          <li class="md-doc-demo_code_tab_btn">
            <a href="javascript:void(0)" @click="toggleDemoCode">
              <a-icon :type="!isCodeShow ? 'code' : 'close-square'" />
            </a>
          </li>
        </a-tooltip>
      </ul>
      <section v-show="isCodeShow" class="md-doc-demo_code_toggle">
        <slot />
      </section>
    </div>
  </div>
</template>

<script>
import Icon from 'ant-design-vue/lib/icon'
import Tooltip from 'ant-design-vue/lib/tooltip'
import Skeleton from 'ant-design-vue/lib/skeleton'

import 'ant-design-vue/lib/tooltip/style/index.css'
import 'ant-design-vue/lib/skeleton/style/index.css'

export default {
  name: 'md-demo',
  props: ['path'],
  components: {
    [Icon.name]: Icon,
    [Tooltip.name]: Tooltip,
    [Skeleton.name]: Skeleton,
    // PlatformTag
  },
  data() {
    return {
      dynamicComponent: null,
      metaInfo: {
        title: '基础'
      },
      isCodeShow: false,
      zoom: 1
    }
  },
  computed: {
    demoInfo () {
      const info = this.metaInfo[this.$lang]
      return info || this.metaInfo
    },
  },
  mounted () {
    if (this.path) {
      import(
        /* webpackInclude: /demo\/cases(.*)\/(.*)\.vue/ */
        `mand-mobile/lib/${this.path}`
      ).then(module => {
        this.dynamicComponent = module.default
        this.metaInfo = Object.assign({}, this.metaInfo, module.metaInfo)
        this.resize()
      }).catch(err => {
        console.log(err)
      })
    }

    window.addEventListener('resize', this.resize.bind(this))
  },
  methods: {
    resize () {
      this.$nextTick(() => {
        const content = this.$el.querySelector('.md-doc-demo_content_case')
        if (content) {
          this.zoom = content.clientWidth / 750
        }
      })
    },
    toggleDemoCode () {
      this.isCodeShow = !this.isCodeShow
    },
    getMetaInfo (prop) {
      return this.demoInfo[prop] || this.metaInfo[prop]
    }
  }
}
</script>

<style lang="stylus" scoped>
.md-doc-demo
  width 100%
  margin-bottom 1em
  border solid 1px #E2E4EA
  border-radius 8px
  box-sizing border-box
  overflow hidden

  .md-doc-demo_header
    display flex
    align-items center
    padding .8em
    border-bottom solid 1px #E2E4EA
    p
      margin 0
    &_ext
      margin-left auto
    &_title
      // font-size 1.2em
      font-weight 500
    &_desc
      margin-top 0.5em
      font-size 0.8em
      color #666f83

  .md-doc-demo_content
    .md-doc-demo_content_case
      max-width 450px
      margin 0 auto
      /deep/.md-example-child
        padding 1.5em
        zoom .6
      &:after
        content ""
        display table
        clear both
    /deep/.ant-skeleton
      padding 1em 2em
      box-sizing border-box

  .md-doc-demo_code
    &_tab
      display flex
      justify-content center
      align-items center
      height 3em
      margin 0
      padding 0
      border-top dashed 1px #f1e9e9
      &_btn
        padding 1em
        list-style none
        line-height 1
        font-size .9em
        // opacity .1
        a
          transition all .3s
          color #314659
        &:hover a
          color #2f86f6
    &_toggle
      div[class*="language-"]
        display flex
        margin-bottom 0
        border-radius 0
      pre
        margin 0
        padding 1em
        // font-size .9em
        line-height 1.3
        code
          font-size .8em
</style>