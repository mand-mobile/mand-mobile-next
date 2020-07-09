<template>
  <div class="md-example-child md-example-child-icon md-example-child-icon-3">
    <div class="md-example-item-s">
      <md-icon name="security" color="gray"></md-icon>
      <p>gray</p>
    </div>
    <div class="md-example-item-s">
      <md-icon name="security" color="orange"></md-icon>
      <p>orange</p>
    </div>
    <div class="md-example-item-s">
      <md-icon name="security" color="blue"></md-icon>
      <p>blue</p>
    </div>
    <div class="md-example-item-s">
      <md-icon name="security" color="purple"></md-icon>
      <p>purple</p>
    </div>
  </div>
</template>

<script>
import Icon  from '../../../icon'

export default {
  name: 'icon-demo',
  /* DELETE */
  title: '颜色',
  titleEnUS: 'Icon color',
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
