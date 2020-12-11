<template>
  <div class="md-example-child md-example-child-button md-example-child-button-0">
    <md-button class="button" type="default">Default</md-button>
    <md-button class="button" type="default" inactive>Default Inactive</md-button>
    <md-button class="button" type="primary">Primary</md-button>
    <md-button class="button" type="primary" inactive>Primary Inactive</md-button>
    <md-button class="button" type="primary" loading>Loading</md-button>
    <md-button class="button" type="warning">Warning</md-button>
    <md-button class="button" type="warning" inactive>Warning Inactive</md-button>
    <md-button class="button" type="disabled">Disabled</md-button>
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
  title: '基础',
}
// #endregion ignore

</script>

<style>
.md-example-child-button-0 .button {
  display: block;
  margin-bottom: 16px;
} 
</style>