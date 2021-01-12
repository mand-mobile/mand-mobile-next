<template>
  <div class="md-activity-indicator-rolling-success">
    <img v-if="!isSuccess" class="md-activity-indicator-rolling-success_image" src="https://pt-starimg.didistatic.com/static/starimg/img/IHcr0BomhJ1609333095846.gif" alt="" />
    <img v-else class="md-activity-indicator-rolling-success_image" src="https://pt-starimg.didistatic.com/static/starimg/img/DRz83ufJVh1609333095729.gif" alt="" />
  </div>
</template>

<script>
export default {
  props: {
    isSuccess: {
      type: Boolean,
      default: false,
    },
  },
}

</script>

<style lang="stylus">
.md-activity-indicator-rolling-success
  width 100%
  height 100%
  &_image
    display block
    width 100%
    height 100%
</style>