<template>
  <div class="md-example-child  md-example-child-button md-example-child-button-3">
    <div class="md-example-section">
      <md-button class="button" type="primary" icon="edit" inline>Inline Primary</md-button>
      <md-button class="button" type="primary" inline plain>Inline Plain</md-button>
    </div>
    <div class="md-example-section">
      <md-button class="button" type="warning" size="small" inline>Warning</md-button>
      <md-button class="button" type="disabled" size="small" inline>Disabled</md-button>
    </div>
  </div>
</template>

<script>
import Button from 'mand-mobile/lib/button'

export default {
  components: {
    'md-button': Button,
  },
}
// #region ignore
export const metaInfo = {
  title: '行内按钮',
}
// #endregion ignore

</script>

<style>
.md-example-child-button-3 .md-example-section {
  display: block;
  margin-bottom: 16px;
}
.md-example-child-button-3 .button {
  margin-right: 16px;
} 
</style>
