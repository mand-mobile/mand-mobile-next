<template>
  <div
    class="
      md-example-child
      md-example-child-button
      md-example-child-button-2
    "
  >
    <md-button type="default" round
      >Default & Round</md-button
    >
    <md-button type="primary" round
      >Primary & Round</md-button
    >
    <md-button type="warning" round
      >Warning & Round</md-button
    >
    <md-button type="disabled" round
      >Disabled & Round</md-button
    >
  </div>
</template>

<script lang="ts">
import Button from 'mand-mobile/button'

export default {
  name: 'ButtonDemo',
  title: '圆角按钮',
  titleEnUS: 'Round buttons',
  components: {
    [Button.name]: Button,
  },
}
</script>
