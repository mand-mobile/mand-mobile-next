<script lang="ts">
export default {
  name: '特殊标签',
  title: 'Special tags',
}
</script>
<script setup lang="ts">
import MdTag from 'mand-mobile/tag'
import MdIcon from 'mand-mobile/icon'
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
      shape="coupon"
      fill-color="#FC9153"
      type="fill"
      font-color="#fff"
      style="margin-right: 20px"
      >免息券70.1</md-tag
    >
    <md-tag
      size="large"
      shape="quarter"
      fill-color="#FC9153"
      type="fill"
      font-color="#fff"
      style="margin-right: 20px"
    >
      <md-icon name="right"></md-icon>
    </md-tag>
    <md-tag
      size="large"
      shape="bubble"
      fill-color="linear-gradient(90deg, #FF5B60 0%, #F98472 100%)"
      type="fill"
      >99</md-tag
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
