<script lang="ts">
export default {
  name: 'Fillet',
  title: '圆角',
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
      shape="fillet"
      type="fill"
      fill-color="rgba(255, 91, 96, .1)"
      font-weight="normal"
      font-color="#FF5B60"
      >逾期23天</md-tag
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
