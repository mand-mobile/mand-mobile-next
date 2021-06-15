<script lang="ts">
export default {
  name: 'Square',
  title: '线框',
}
</script>
<script setup lang="ts">
import MdTag from 'mand-mobile/tag'
</script>

<template>
  <div
    class="
      md-example-child
      md-example-child-tag
      md-example-child-tag-2
    "
  >
    <md-tag
      size="large"
      shape="square"
      font-color="#FF8843"
      type="ghost"
      >可选</md-tag
    >
    <md-tag
      size="small"
      shape="square"
      font-color="#28AA91"
      type="ghost"
      >可选</md-tag
    >
  </div>
</template>

<style lang="stylus">
.md-example-child-tag
  display flex
  align-items center
  padding v-gap-md h-gap-lg
  background color-bg-base
  .md-tag
    margin-right h-gap-sm
</style>
