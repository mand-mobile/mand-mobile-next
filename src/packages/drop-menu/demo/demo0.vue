<script lang="ts">
export default {
  name: 'DropMenuDemo',
  title: '基础下拉菜单',
  titleEnUS: 'Basic drop-down menu',
  height: 250,
}
</script>
<script setup lang="ts">
import { ref } from 'vue'
import MdDropMenu from 'mand-mobile-next/drop-menu'

const data = ref([
  {
    text: '一级选项1',
    options: [
      {
        value: '0',
        text: '二级选项1',
      },
      {
        value: '1',
        text: '二级选项2',
      },
    ],
  },
])
</script>

<template>
  <div
    class="
      md-example-child
      md-example-child-drop-menu
      md-example-child-drop-menu-0
    "
  >
    <md-drop-menu :data="data" />
    <div class="content">正文区域</div>
  </div>
</template>
