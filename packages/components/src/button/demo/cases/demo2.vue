<template>
  <div class="md-example-child md-example-child-button md-example-child-button-2">
    <md-button class="button" type="default" round>Default & Round</md-button>
    <md-button class="button" type="primary" round>Primary & Round</md-button>
    <md-button class="button" type="warning" round>Warning & Round</md-button>
    <md-button class="button" type="disabled" round>Disabled & Round</md-button>
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
  title: '圆角按钮',
}
// #endregion ignore

</script>

<style>
.md-example-child-button-2 .button {
  display: block;
  margin-bottom: 16px;
} 
</style>
