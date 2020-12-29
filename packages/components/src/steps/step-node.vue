<template>
  <div class="md-steps-node" :class="{'md-steps-node--active': active}">
    <div class="md-steps-node_icon" style="width:8px;height:8px;"></div>
  </div>
</template>

<script>
export default {
  name: 'md-steps-node',
  props: {
    active: {
      type: Boolean,
      default: false,
    },
  },
}

</script>

<style lang="stylus">
.md-steps-node
  .md-steps-node_icon
    border-radius 50%
    background md-steps-color
  &--active
    .md-steps-node_icon
      background md-steps-color-active
</style>