<script lang="ts">
export default {
  name: 'TabBarDemo',
  title: '无下划线',
}
</script>
<script setup lang="ts">
import MdTabBar from 'mand-mobile-next/tab-bar'
import { ref } from 'vue'

const current = ref(1)
const items = [
  { name: 1, label: '标签1' },
  { name: 2, label: '标签2', disabled: true },
]

const onChange = (item: any, index: number) => {
  console.log(item, index)
}
</script>

<template>
  <div
    class="
      md-example-child
      md-example-child-tabs
      md-example-child-tab-bar-3
    "
  >
    <md-tab-bar
      v-model="current"
      :items="items"
      :has-ink="false"
      @change="onChange"
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
