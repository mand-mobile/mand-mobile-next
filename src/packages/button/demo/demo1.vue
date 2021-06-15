<template>
  <div
    class="
      md-example-child
      md-example-child-button
      md-example-child-button-0
    "
  >
    <md-button type="default" plain
      >Default & Plain</md-button
    >
    <md-button type="primary" plain
      >Primary & Plain</md-button
    >
    <md-button type="warning" plain
      >Warning & Plain</md-button
    >
    <md-button type="disabled" plain
      >Disabled & Plain</md-button
    >
    <md-button type="primary" plain round
      >Primary & Plain & Round</md-button
    >
    <md-button type="primary" plain round loading
      >Primary & Plain & Loading</md-button
    >
  </div>
</template>

<script lang="ts">
import Button from 'mand-mobile/button'

export default {
  name: 'ButtonDemo',
  title: '线性按钮',
  titleEnUS: 'Plain buttons',
  components: {
    [Button.name]: Button,
  },
}
</script>
