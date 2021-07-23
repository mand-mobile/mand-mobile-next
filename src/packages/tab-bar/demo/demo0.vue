<script lang="ts">
export default {
  name: 'TabBarDemo',
  title: '基本',
}
</script>
<script setup lang="ts">
import MdTabBar from 'mand-mobile-next/tab-bar'
import { ref } from 'vue'

const current = ref(2)
const items = [
  { name: 1, label: '标签1' },
  { name: 2, label: '标签2' },
  { name: 3, label: '标签33' },
  { name: 4, label: '标签444' },
  { name: 5, label: '标签5' },
  { name: 6, label: '标签6' },
  { name: 7, label: '标签777777' },
  { name: 8, label: '标签8' },
  { name: 9, label: '标签9' },
]
</script>

<template>
  <div
    class="
      md-example-child
      md-example-child-tabs
      md-example-child-tab-bar-0
    "
  >
    <md-tab-bar v-model="current" :items="items">
      <template #default="slotProps">
        <span class="green">{{
          slotProps.item.label
        }}</span>
      </template>
    </md-tab-bar>
    <br />
    <md-tab-bar
      v-model="current"
      :items="items.slice(0, 2)"
    >
      <template #default="slotProps">
        <span class="green">{{
          slotProps.item.label
        }}</span>
      </template>
    </md-tab-bar>
  </div>
</template>

<style lang="stylus">
.md-example-child-tabs
  .md-tab-bar
    background-color #fff
</style>
