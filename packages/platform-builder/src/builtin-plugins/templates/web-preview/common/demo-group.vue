<template>
  <div class="md-example picker">
<% for (let demoIndex = 0; demoIndex < component.demoCases.length; demoIndex++) {%>

    <section class="md-example-section" >
      <div class="md-example-title" v-html="demoProps(<%- demoIndex %>, 'title', '基础')"></div>
      <div class="md-example-describe" v-if="demoProps(<%- demoIndex %>, 'describe')" v-html="demoProps(<%- demoIndex %>, 'describe')"></div>
      <div class="md-example-content">
        <demo<%- demoIndex %>></demo<%- demoIndex %>>
      </div>
    </section>
<%}%>

	</div>
</template>

<script>
// @example import Demo1 from './cases/demo1'
// prettier-ignore
<% for (let demoIndex = 0; demoIndex < component.demoCases.length; demoIndex++) {%>
import * as Demo<%- demoIndex %> from '../mand-mobile/<%- component.dashedStyledName %>/demo/cases/<%- component.demoCases[demoIndex] %>'
<% } %>

export default {
  name: '<%- component.dashedStyledName %>-demo',
  data() {
    return {
      demos: [
        <% for (let demoIndex = 0; demoIndex < component.demoCases.length; demoIndex++) {%>
        Demo<%- demoIndex %>,
        <% } %>
      ],
    }
  },
  components: {
    <% for (let demoIndex = 0; demoIndex < component.demoCases.length; demoIndex++) {%>
    'Demo<%- demoIndex %>': Demo<%- demoIndex %>.default,
    <% } %>
  },
  computed: {
    lang () {
      const r = window.location.search.substr(1).match(new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i'))
      if (r != null) {
        return decodeURIComponent(r[2])
      }
      return 'zh-CN'
    },
    demoProps () {
      return (index, key, defaultVal = '') => {
        let metaInfo = this.demos[index].metaInfo || {}
        metaInfo = metaInfo[this.lang] || metaInfo
        const value = metaInfo ? metaInfo[key] : ''
        return value || defaultVal
      }
    }
  },
}
</script>

<style lang="stylus">
// .md-example.picker .md-example-title a
//   font-size 20px !important
.md-example
  clearfix()
  position relative
  z-index 3
  padding 20px
  .md-example-section
    clearfix()
    margin-bottom 30px
    color #111A34
    .md-example-title
      block()
      font-size 24px
      font-weight 500
      a
        margin-right 5px
        background #2F86F6
        color #fff
        padding 5px 10px
        border-radius 8px
        font-size 24px
        font-weight 300
        line-height 28px
        text-decoration none
    .md-example-describe
      block()
      margin-top 15px
      font-size 24px
      font-weight 300
      color #666f83
    .md-example-content
      block()
      position relative
      margin-top 20px
      box-sizing border-box
      font-size 28px
</style>

