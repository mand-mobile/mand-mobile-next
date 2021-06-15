<script lang="ts">
export default {
  name: 'DropMenuDemo',
  title: '自定义菜单项',
  titleEnUS: 'Custom menu options',
  height: 250,
}
</script>
<script setup lang="ts">
import { ref } from 'vue'
import MdDropMenu from 'mand-mobile/drop-menu'

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
      md-example-child-drop-menu-3
    "
  >
    <md-drop-menu :data="data">
      <template #default="{ option }">
        <div
          class="md-drop-menu-custom-title"
          v-text="option.text"
        ></div>
        <div class="md-drop-menu-custom-brief">
          {{ option.text }}
          【可使用slot-scope进行自定义描述】
        </div>
      </template>
    </md-drop-menu>
    <div class="content">正文区域</div>
  </div>
</template>

<style lang="stylus">
.md-example-child-drop-menu-3
  .md-drop-menu-custom-title
    font-size 28px
    text-align center
  .md-drop-menu-custom-brief
    font-size 20px
    color #999
    text-align center
</style>
