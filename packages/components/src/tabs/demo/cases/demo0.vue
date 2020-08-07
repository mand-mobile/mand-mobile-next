<template>
  <div class="md-example-child md-example-child-tabs md-example-child-tabs-0">
    <md-tabs>
      <md-tab-pane name="p1" label="第一章">
        <div class="content">
          她对他很满意。走吧。好。他起身买单，腿却一拐一拐的。难怪他才华横溢，事业有成，却还是单身。趁着他买单，她赶紧悄悄走了。
        </div>
      </md-tab-pane>
      <md-tab-pane name="p2" label="第二章">
        <div class="content">
          又是一年，她又遇到了他，他正牵着孩子的手，走的飞快。
        </div>
      </md-tab-pane>
      <md-tab-pane name="p3" label="第三章" disabled>
        <div class="content">
          你的腿？她有些诧异。腿？我的腿怎么了？他更诧异。后来，她才知道他的腿，那天只是坐麻了而已。
        </div>
      </md-tab-pane>
    </md-tabs>
  </div>
</template>

<script>
import Tabs from 'mand-mobile/lib/tabs'
import TabPane from 'mand-mobile/lib/tabs/tab-pane'

export default {
  name: 'tab-bar-demo',
  components: {
    'md-tabs': Tabs,
    'md-tab-pane': TabPane,
  },
}

</script>

<style>
.md-example-child-tabs {
  background: #FFF;
}

.md-example-child-tabs .content {
  height: 300px;
  padding: 32px;
  font-size: 28px;
  line-height: 1.5;
  box-sizing: border-box;
}
</style>

