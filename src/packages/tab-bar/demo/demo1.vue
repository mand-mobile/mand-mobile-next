<script lang="ts">
export default {
  name: 'TabBarDemo',
  title: '自定义内容',
}
</script>
<script setup lang="ts">
import MdTabBar from 'mand-mobile-next/tab-bar'
import MdIcon from 'mand-mobile-next/icon'
import { ref } from 'vue'

const current = ref(1)
const items = [
  { name: 1, label: '首页', icon: 'home' },
  { name: 2, label: '我的', icon: 'user' },
]
</script>

<template>
  <div
    class="
      md-example-child
      md-example-child-tabs
      md-example-child-tab-bar-4
    "
  >
    <md-tab-bar v-model="current" :items="items">
      <template #default="{ item }">
        <div class="custom-item">
          <div class="icon">
            <md-icon :name="item.icon" />
          </div>
          <div class="text">
            <span v-text="item.label"></span>
          </div>
        </div>
      </template>
    </md-tab-bar>
  </div>
</template>

<style lang="stylus">
.md-example-child-tab-bar-4
  .custom-item
    display flex
    flex-direction column
    align-items center
    justify-content center
    height 100%
    flex 1
    .text
      font-size 20px
</style>
