<script lang="ts">
export default {
  name: 'TagDemo',
  title: 'Characters cut in relief',
}
</script>
<script setup lang="ts">
import MdTag from 'mand-mobile-next/tag'
</script>

<template>
  <div
    class="
      md-example-child
      md-example-child-tag
      md-example-child-tag-1
    "
  >
    <md-tag
      size="large"
      shape="square"
      fill-color="rgba(0,0,0,0)"
      type="fill"
      font-weight="bolder"
      font-color="#333"
      >￥3600</md-tag
    >

    <md-tag
      size="small"
      shape="square"
      fill-color="rgba(0,0,0,0)"
      type="fill"
      font-weight="bolder"
      font-color="#333"
      >￥300</md-tag
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
