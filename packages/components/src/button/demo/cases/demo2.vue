<template>
  <div class="md-example-child md-example-child-button md-example-child-button-2">
    <md-button class="md-button" type="default" round>Default & Round</md-button>
    <md-button class="md-button" type="primary" round>Primary & Round</md-button>
    <md-button class="md-button" type="warning" round>Warning & Round</md-button>
    <md-button class="md-button" type="disabled" round>Disabled & Round</md-button>
  </div>
</template>

<script>
import Button from '../../../button'

export default {
  name: 'button-demo',
  /* DELETE */
  title: '圆角按钮',
  titleEnUS: 'Round Buttons',
  /* DELETE */
  components: {
    'md-button': Button,
  },
}

</script>

<style lang="stylus" scoped>
.md-button
  display block
  margin-bottom 16px
</style>
