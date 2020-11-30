<template>
  <a-affix :offset-top="0">
    <aside class="md-doc-sidebar">
      <div class="md-doc-sidebar_version">
        <a-icon type="cloud-upload" />&nbsp;&nbsp;VERSION<span>{{version}}</span>
      </div>
      <ul class="md-doc-sidebar_list" role="menu">
        <template v-for="(item0, index0) in sidebarItems">
          <SidebarItem
            class="level-0"
            :grouped="item0.children"
            :item="item0"
            :key="`0-${index0}`"
          >
            <template v-if="item0.children">
              <SidebarItem
                class="level-1"
                v-for="(item1, index1) in item0.children"
                :item="item1" :key="`1-${index1}`"
                :grouped="item1.children"
              >
                <template v-if="item1.children">
                  <SidebarItem
                    v-for="(item2, index2) in item1.children"
                    :item="item2" :key="`2-${index2}`"
                    class="level-2"
                  ></SidebarItem>
                </template>
              </SidebarItem>
            </template>
          </SidebarItem>
        </template>
      </ul>
    </aside>
  </a-affix>
</template>

<script>
import Affix from 'ant-design-vue/lib/affix' 
import Icon from 'ant-design-vue/lib/icon'
// import 'ant-design-vue/lib/affix/style/index.css'
import SidebarItem from './SidebarItem'

export default {
  props: ['sidebarItems'],
  components: {
    SidebarItem,
    [Affix.name]: Affix,
    [Icon.name]: Icon
  },
  computed: {
    version () {
      return this.$themeConfig.version
    }
  }
}
</script>

<style lang="stylus" scoped>
.md-doc-sidebar
  height 100vh
  // margin-top 1em
  padding 0 1.5em 2em
  // border-right 1px solid #e8e8e8
  background #FFF
  box-sizing border-box
  overflow auto
  &_version
    height 2.4em
    line-height 2.4em
    margin-bottom 10px
    padding 0 16px
    border solid 1px rgba(47, 134, 246, .15)
    border-radius 1.2em
    font-size .8em
    font-family DINAlternate-Bold, AvenirNext-Medium, Microsoft Yahei, Lato, Lucida Grande, Lucida Sans Unicode, Lucida Sans, Verdana, Tahoma, sans-serif
    background-color rgba(47, 134, 246, .03)
    span
      margin-left .5em
      color $accentColor
  &_list
    margin 0
    padding 0
  &::-webkit-scrollbar
    display none
@media (max-width: 1500px)
  /deep/.md-doc-sidebar_item_text span
    display none
</style>