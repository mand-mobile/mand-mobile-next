<template>
  <div class="md-example-child md-example-child-icon md-example-child-icon-2">
    <div class="md-example-item-s">
      <md-icon name="location" size="xs"></md-icon>
      <p>xs</p>
    </div>
    <div class="md-example-item-s">
      <md-icon name="location" size="sm"></md-icon>
      <p>sm</p>
    </div>
    <div class="md-example-item-s">
      <md-icon name="location" size="md"></md-icon>
      <p>md</p>
    </div>
    <div class="md-example-item-s">
      <md-icon name="location" size="lg"></md-icon>
      <p>lg</p>
    </div>
  </div>
</template>

<script>
import Icon  from '../../../icon'

export default {
  name: 'icon-demo',
  /* DELETE */
  title: '大小',
  titleEnUS: 'Icon size',
  background: '#fff',
  /* DELETE */
  components: {
    'md-icon': Icon,
  },
}

</script>

<style lang="stylus">
.md-example-child-icon
  padding 0 32px
  display flex
  flex-wrap wrap
  justify-content space-around
  align-items center
  .md-example-item-s
    margin-bottom 16px
    // width 30%
  .icon-name
    font-size 24px
</style>
