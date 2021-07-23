<script lang="ts">
export default {
  name: 'TabsDemo',
  title: '基本',
}
</script>
<script setup lang="ts">
import { ref } from 'vue'
import MdTabs from 'mand-mobile-next/tabs'
import MdButton from 'mand-mobile-next/button'
import MdIcon from 'mand-mobile-next/icon'
import MdTabPane from '../pane.vue'

const change = (item: any) => {
  console.log(item)
}

const disabled = ref(true)
const tabs = ref<any>(null)

const goToThree = () => {
  disabled.value = false
  setTimeout(() => {
    tabs.value.$refs.swiper
      .getSwiperInstance()
      ?.goToPage(2, 0)
  })
}
</script>

<template>
  <div
    class="
      md-example-child
      md-example-child-tabs
      md-example-child-tabs-0
    "
  >
    <md-tabs
      ref="tabs"
      :default-index="0"
      :immediate="true"
      @change="change"
    >
      <md-tab-pane class="content" name="p1" label="第一章">
        她对他很满意。走吧。好。他起身买单，腿却一拐一拐的。难怪他才华横溢，事业有成，却还是单身。趁着他买单，她赶紧悄悄走了。
      </md-tab-pane>
      <md-tab-pane class="content" name="p2" label="第二章">
        又是一年，她又遇到了他，他正牵着孩子的手，走的飞快。
        <md-button type="link" @click="goToThree">
          支付0元，解锁第三章
          <md-icon name="arrow-right" size="xs" />
        </md-button>
      </md-tab-pane>
      <md-tab-pane
        class="content"
        name="p3"
        label="第三章"
        :disabled="disabled"
      >
        你的腿？她有些诧异。腿？我的腿怎么了？他更诧异。后来，她才知道他的腿，那天只是坐麻了而已。
      </md-tab-pane>
    </md-tabs>
  </div>
</template>

<style lang="stylus">
.md-example-child-tabs-0
  background-color #fff
  .md-tab-bar
    background-color #fff
  .content
    margin 12px 0
    font-size 28px
    background #FFF
    padding 20px
    line-height 1.5
    box-sizing border-box
  .md-tabs-content
    min-height 200px
    background #FFF
</style>
