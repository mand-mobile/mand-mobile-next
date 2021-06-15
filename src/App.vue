<template>
  <router-view />
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'App',
  components: {},
})
</script>

<style lang="stylus">
#app
  height 100vh
  height -webkit-fill-available
  display flex
  flex-direction column
  font-family Helvetica Neue For Number,-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,PingFang SC,Hiragino Sans GB,Microsoft YaHei,Helvetica Neue,Helvetica,Arial,sans-serif
.md-nav
  position relative
  display flex
  align-items center
  padding 32px 20px
  font-size 0
  box-shadow 0 0 5px 0 rgba(158, 158, 158, .15)
  p
    position relative
    &.home
      // top 10px
      .md-icon
        color color-text-base
    &.name
      margin-left h-gap-lg
      line-height 60px
      font-size font-heading-large
      font-weight font-weight-medium
      color color-text-base
    &.name-zh
      top -10px
      margin-left h-gap-sm
      font-size font-body-large
      font-weight font-weight-normal
      color color-text-minor
.md-example
  height calc(100vh - 124px)
  padding 20px
  overflow-y auto
  background color-bg-base
  .md-example-section
    margin-bottom 30px
    color color-text-base
    .md-example-title
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
      margin-top 15px
      font-size font-minor-large
      font-weight 300
      color color-text-minor
    .md-example-content
      position relative
      margin-top 20px
      box-sizing border-box
      font-size 28px
.md-dialog pre
  width 100%
  padding 20px 10px
  box-sizing border-box
  white-space pre-wrap
  word-wrap break-word
  font-size font-minor-normal
  background color-bg-base
  border-radius radius-normal
</style>
