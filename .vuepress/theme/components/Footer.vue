<template>
  <div class="md-doc-footer">
    <div class="md-doc-footer_content">
      <section v-for="(val, key) in data" class="md-doc-footer_content_block">
        <p class="md-doc-footer_content_block_title">{{key}}</p>
        <ul>
          <li v-for="(subval, subkey) in val" class="md-doc-footer_content_block_item" :key="subkey">
            <template v-if="typeof subval === 'string'">
              <a :href="subval">{{subkey}}</a>
            </template>
            <template v-else>
              <a :href="subval.link">
                <img v-if="subval.logo" :src="subval.logo" alt="">{{subkey}}<span v-if="subval.desc">&nbsp;-&nbsp;{{subval.desc}}</span> 
              </a>
            </template>
          </li>
        </ul>
      </section>
    </div>
    <div class="md-doc-footer_ext">
      滴滴金融泛前端&nbsp;❤&nbsp;MFE
    </div>
    <!-- <svg class="md-doc-footer_bg" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320"><path fill="#0099ff" fill-opacity="1" d="M0,192L48,165.3C96,139,192,85,288,69.3C384,53,480,75,576,80C672,85,768,75,864,69.3C960,64,1056,64,1152,80C1248,96,1344,128,1392,144L1440,160L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path></svg> -->
  </div>
</template>

<script>
import Tooltip from 'ant-design-vue/lib/tooltip'

import 'ant-design-vue/lib/tooltip/style/index.css'
export default {
  props: {
    data: {
      required: true
    }
  },
  components: {
    [Tooltip.name]: Tooltip,
  },
  computed: {
    
  }
}
</script>

<style lang="stylus" scoped>
.md-doc-footer
  position relative
  // padding-top 70px
  padding-left 16.666%
  padding-right 10em
  // border-top solid 1px #E2E4EA
  box-sizing border-box
  background-color #000
  overflow hidden
  &_content
    position relative
    width 1000px
    margin 0 auto
    padding 3em 0
    display flex
    justify-content space-between
    &_block
      width 240px
      ul, li
        padding 0
        list-style none
      &_title
        font-size 1.2em
        font-weight 500
        color #FFF
      &_item
        margin-bottom 10px
        a
          display flex
          align-items center
          font-size .9em
          font-weight 400
          color #FFF
          img
            width 18px
            margin-right 5px
          span
            font-size .9em
            color #858B9C
          &:hover
            color #2f86f6
  &_ext
    padding 1em 0
    font-size .8em
    color #666f83
    text-align center
  &_bg
    position absolute
    left 0
    right 0
    top 0
    bottom 0
        
@media (max-width: 750px)
  .md-doc-footer
    align-items center
    height 100px
    // padding-top 40px
    &_ext
      display none
    &_bg
      top auto
      bottom 0
</style>