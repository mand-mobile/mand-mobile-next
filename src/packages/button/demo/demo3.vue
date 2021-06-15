<template>
  <div
    class="
      md-example-child
      md-example-child-button
      md-example-child-button-3
    "
  >
    <div class="md-example-section">
      <md-button type="primary" icon="edit" inline
        >Inline Primary</md-button
      >
      <md-button type="primary" inline plain
        >Inline Plain</md-button
      >
    </div>
    <div class="md-example-section">
      <md-button type="warning" size="small" inline
        >Warning</md-button
      >
      <md-button type="disabled" size="small" inline
        >Disabled</md-button
      >
    </div>
  </div>
</template>

<script lang="ts">
import Button from 'mand-mobile/button'

export default {
  name: 'ButtonDemo',
  title: '行内按钮',
  titleEnUS: 'Inline buttons',
  components: {
    [Button.name]: Button,
  },
}
</script>
