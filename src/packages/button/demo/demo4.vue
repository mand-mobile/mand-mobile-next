<template>
  <div
    class="
      md-example-child
      md-example-child-button
      md-example-child-button-3
    "
  >
    <md-button type="link" icon="message">评论</md-button>
    <md-button type="link" inactive
      >去看看<md-icon name="arrow-right" size="md"></md-icon
    ></md-button>
  </div>
</template>

<script lang="ts">
import { Button } from 'mand-mobile-next/button'
import { Icon } from 'mand-mobile-next/icon'

export default {
  name: 'ButtonDemo',
  title: '文字链接按钮',
  titleEnUS: 'Text link buttons',
  align: 'right',
  components: {
    [Button.name]: Button,
    [Icon.name]: Icon,
  },
}
</script>

<style lang="stylus">
.md-example-child-button-3
  .md-example-box-content
    width 100%
    padding 60px h-gap-lg
    color color-text-base
    font-size font-minor-large
    text-align left
    background color-bg-base
    box-sizing border-box
    line-height 1.5
    text-indent 2em
</style>
