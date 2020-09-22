<template>
  <div class="md-doc-footer">
    <div class="md-doc-footer_content">滴滴金融泛前端&nbsp;&copy;&nbsp;MFE</div>
    <div class="md-doc-footer_ext">
      
    </div>
    <!-- <svg class="md-doc-footer_bg" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320"><path fill="#0099ff" fill-opacity="1" d="M0,192L48,165.3C96,139,192,85,288,69.3C384,53,480,75,576,80C672,85,768,75,864,69.3C960,64,1056,64,1152,80C1248,96,1344,128,1392,144L1440,160L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path></svg> -->
  </div>
</template>

<script>
import Tooltip from 'ant-design-vue/lib/tooltip'

import 'ant-design-vue/lib/tooltip/style/index.css'
export default {
  components: {
    [Tooltip.name]: Tooltip,
  }
}
</script>

<style lang="stylus" scoped>
.md-doc-footer
  position relative
  display flex
  justify-content center
  height 300px
  // padding-top 70px
  padding-left 16.666%
  // border-top solid 1px #E2E4EA
  box-sizing border-box
  background-color #111A34
  overflow hidden
  &_content
    position relative
    z-index 2
    display flex
    align-items center
    // margin-left 5px
    font-family "yegenyou"
    color #FFF
  &_ext
    position absolute
    bottom 0
    right 1.5em
    z-index 2
    margin-left auto
    &_logo
      display flex
      align-items center
      justify-content center
      width 3em
      height 3em
      margin-bottom 1em
      background-color #FFF
      border-radius 50%
      overflow hidden
      img
        width 2em
  &_bg
    position absolute
    left 0
    right 0
    top 0
    bottom 0
        
@media (max-width: 750px)
  .md-doc-footer
    align-items end
    height 100px
    // padding-top 40px
    &_ext
      display none
    &_bg
      top auto
      bottom 0
</style>