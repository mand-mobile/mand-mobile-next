<template>
  <div class="md-doc-demo">
    <header class="md-doc-demo_header" v-if="!getMetaInfo('hideHeader')">
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
      <div class="md-doc-demo_content_case" :style="{height: getMetaInfo('height') ? `${getMetaInfo('height')}px` : 'auto'}">
        <ClientOnly v-if="dynamicComponent">
          <component :is="dynamicComponent" :style="{ zoom }"/>
        </ClientOnly>
        <a-skeleton v-else active :title="false" />
      </div>
      
    </div>
    <div class="md-doc-demo_code" v-if="!getMetaInfo('hideCode')">
      <ul class="md-doc-demo_code_tab">
        <!-- <li class="md-doc-demo_code_tab_btn">
          <a href="javascript:void(0)">
            <a-icon type="edit" />
          </a>
        </li> -->
        <a-tooltip>
          <template slot="title">
            <span v-if="isCodeCopying">
              <a-icon type="check-circle" /> 复制成功
            </span>
            <span v-else>复制源码</span>
          </template>
          <li class="md-doc-demo_code_tab_btn">
            <a href="javascript:void(0)" @click="doCopy">
              <a-icon type="copy" />
            </a>
          </li>
        </a-tooltip>
        <a-tooltip>
          <template slot="title">{{isCodeShow ? '隐藏源码' : '展示源码'}}</template>
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
import Vue from 'vue'
import Icon from 'ant-design-vue/lib/icon'
import Tooltip from 'ant-design-vue/lib/tooltip'
import Skeleton from 'ant-design-vue/lib/skeleton'

import 'ant-design-vue/lib/tooltip/style/index.css'
import 'ant-design-vue/lib/skeleton/style/index.css'

import {setScale} from '../util'

export default {
  name: 'md-demo',
  props: ['path', 'code'],
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
      isCodeCopying: false,
      zoom: 1
    }
  },
  computed: {
    demoInfo () {
      const info = this.metaInfo[this.$lang]
      return info || this.metaInfo
    },
    shadowMode () {
      return this.$site.themeConfig.demoConfig.shadowMode
    },
  },
  mounted () {
    if (this.path) {
      /* webpackInclude: /demo\/cases(.*)\/(.*)\.vue/ */
      /* webpackMode: "eager" */
      // `mand-mobile/lib/${this.path}`
      import(
        /* webpackInclude: /demo\/cases(.*)\/(.*)\.vue/ */
        /* webpackExclude: /__temp__/ */
        `mand-mobile/lib/${this.path}`
      ).then(module => {
        this.resize(zoom => {
          if (document.documentElement.clientWidth > 750) {
            setScale(.5)
          }
          if (this.shadowMode) {
            this.renderShadowDemo(module.default)
            this.renderShadowDemoStyle({ zoom })
          } else {
            this.dynamicComponent = module.default
          }
        })
        // console.log(module)
        this.metaInfo = Object.assign({}, this.metaInfo, module.metaInfo)
      }).catch(err => {
        console.log(err)
      })
    }

    // window.addEventListener('resize', () => {
    //   this.resize.call(this, zoom => {
    //     this.renderDemoStyle({ zoom })
    //   })
    // })
  },
  methods: {
    resize (fn) {
      this.$nextTick(() => {
        const content = this.$el.querySelector('.md-doc-demo_content_case')
        if (content && fn.call) {
          fn.call(this, this.zoom = content.clientWidth / 750)
        }
      })
    },
    toggleDemoCode () {
      this.isCodeShow = !this.isCodeShow
    },
    getMetaInfo (prop) {
      return this.demoInfo[prop] || this.metaInfo[prop]
    },
    renderShadowDemo (MyComponent = {}) {
      const treeHead = this.$el.querySelector('.md-doc-demo_content_case')
      const holder = document.createElement('div')
      const style = document.createElement( 'style' )
      const shadowRoot = treeHead.attachShadow({mode: 'open'})

      style.type = 'text/css'
      style.id = 'zoomStyle'

      shadowRoot.appendChild(style)
      shadowRoot.appendChild(holder)

      const app = new Vue({
        el: holder,
        shadowRoot,
        render: h => h(MyComponent, {})
      }).$mount()

      this.shadowRoot = shadowRoot
    },
    renderShadowDemoStyle (styles) {
      if (!this.shadowMode || !this.shadowRoot) {
        return
      }
      const styleConent = Object.keys(styles).reduce((pre, cur) => {
        return pre += `${cur}:${styles[cur]};`
      }, '')
      
      this.shadowRoot.querySelector('#zoomStyle').textContent = `.md-example-child { ${styleConent} }`
    },
    doCopy () {
      this.$copyText(decodeURIComponent(this.code)).then(() => {
        this.isCodeCopying = true
        setTimeout(() => {
          this.isCodeCopying = false
        }, 3000)
      }, function (e) {
        alert('Can not copy')
        console.log(e)
      })
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
    // border-top solid 4px $accentColor
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
      position relative
      max-width 480px
      margin 1.5em auto
      font-size 24px
      /deep/.md-example-child
        padding 1.5em
        // zoom .6
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
          color $accentColor
    &_toggle
      div[class*="language-"]
        display flex
        margin-bottom 0
        border-radius 0
      pre
        margin 0
        padding 1em
        // font-size .9em
        line-height 1.5
        code
          font-size .8em

.ant-tooltip-inner .anticon
  color $accentColor
  
</style>

<style lang="stylus">
.dark
  .md-doc-demo
    border-color #606770
    .md-doc-demo_header
      border-bottom-color #606770
    .md-doc-demo_code_tab
      border-top-color #606770
      .anticon
        color #f5f6f7
</style>