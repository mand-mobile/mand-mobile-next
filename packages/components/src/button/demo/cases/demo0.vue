<template>
  <div class="md-example-child md-example-child-button md-example-child-button-0">
    <md-button class="md-button" type="default">Default</md-button>
    <md-button class="md-button" type="default" inactive>Default Inactive</md-button>
    <md-button class="md-button" type="primary">Primary</md-button>
    <md-button class="md-button" type="primary" inactive>Primary Inactive</md-button>
    <md-button class="md-button" type="primary" loading>Loading</md-button>
    <md-button class="md-button" type="warning">Warning</md-button>
    <md-button class="md-button" type="warning" inactive>Warning Inactive</md-button>
    <md-button class="md-button" type="disabled">Disabled</md-button>
  </div>
</template>

<script>
import Button from '../../../button'

export default {
  name: 'button-demo',
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

