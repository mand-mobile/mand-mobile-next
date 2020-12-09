<template>
  <ul class="md-doc-nav-bar">
    <template v-for="(item, key) in navItems">
      <NavBarDropdownLink v-if="item.items" :item="item"/>
      <NavBarLink v-else :item="item" :key="item.link"/>
    </template>
  </ul>
</template>

<script>
import NavBarDropdownLink from './NavBarDropdownLink'
import NavBarLink from './NavBarLink'

export default {
  props: ['navItems'],
  components: {
    NavBarDropdownLink,
    NavBarLink
  },
}
</script>

<style lang="stylus">
.md-doc-nav-bar
  display flex
  justify-content flex-end
  align-items center
  height 100%
  margin-left auto
  margin-bottom 0
  box-sizing border-box
</style>