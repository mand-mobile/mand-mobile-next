<template>
  <div class="md-example">
  <%for (let demoIndex = 0; demoIndex < component.demoCases.length; demoIndex++) {%>
    <section class="md-example-section" >
      <div class="md-example-title" v-html="demos[<%- demoIndex %>].title || '基础'"></div>
      <div class="md-example-describe" v-html="demos[<%- demoIndex %>].describe"></div>
      <div class="md-example-content">
        <demo<%- demoIndex %>></demo<%- demoIndex %>>
      </div>
    </section>
  <%}%>
	</div>
</template>

<script>
// prettier-ignore
<% for (let demoIndex = 0; demoIndex < component.demoCases.length; demoIndex++) {%>
import Demo<%- demoIndex %> from '../mand-mobile/<%- component.dashedStyledName %>/demo/cases/<%- component.demoCases[demoIndex] %>'
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
    Demo<%- demoIndex %>,
    <% } %>
  }
}
</script>

<style lang="stylus">
.md-example
  clearfix()
  position relative
  z-index 3
  padding 20px
  .md-example-section
    clearfix()
    margin-bottom 30px
    color color-text-base
    .md-example-title
      block()
      padding 0
      font-size font-body-normal
      font-weight font-weight-medium
      a
        margin-right 5px
        background color-primary
        color #fff
        padding 5px 10px
        border-radius radius-normal
        font-size font-minor-large
        font-weight 300
        line-height 28px
        text-decoration none
    .md-example-describe
      block()
      margin-top 15px
      font-size font-minor-large
      font-weight 300
      color color-text-minor
    .md-example-content
      block()
      position relative
      margin-top 20px
      box-sizing border-box
      font-size 28px
      background #f9fafb
</style>

