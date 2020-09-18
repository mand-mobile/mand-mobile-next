<template>
  <a-affix :offset-top="0">
    <aside class="md-doc-sidebar">
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
// import 'ant-design-vue/lib/affix/style/index.css'
import SidebarItem from './SidebarItem'

export default {
  props: ['sidebarItems'],
  components: {
    SidebarItem,
    [Affix.name]: Affix
  }
}
</script>

<style lang="stylus" scoped>
.md-doc-sidebar
  height 100vh
  margin-top 1em
  padding 0 1.5em
  border-right 1px solid #e8e8e8
  background #FFF
  box-sizing border-box
  overflow auto
  &_list
    margin 0
    padding 0
  &::-webkit-scrollbar
    display none
@media (max-width: 1500px)
  /deep/.md-doc-sidebar_item_text span
    display none
</style>