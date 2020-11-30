<template>
  <div class="md-doc-nav clearfix">
    <router-link class="prev" :to="prev.path" v-if="prev">
      <i>Prev</i>
      <p v-html="prev.title"></p>
    </router-link>
    <router-link class="next" :to="next.path" v-if="next">
      <i>Next</i>
      <p v-html="next.title"></p>
    </router-link>
  </div>
</template>

<script>
import { flattenConfig } from '../util'

export default {
  name: 'PageNav',

  props: ['sidebarItems'],

  computed: {
    flattenSidebarItems () {
      return Object.values(flattenConfig(this.sidebarItems))
    },

    prev () {
      return find(this.$page, this.flattenSidebarItems, -1)
    },

    next () {
      return find(this.$page, this.flattenSidebarItems, 1)
    }
  }
}

function find (page, items, offset) {
  let target
  for (let i = 0; i < items.length; i++) {
    const cur = items[i]
    if (cur.path === decodeURIComponent(page.path)) {
      target = items[i + offset]
      return target && !target.path
        ? find(page, items, offset > 0 ? ++offset : --offset)
        : target
    }
  }
}

</script>

<style lang="stylus">
.md-doc-nav
  padding 2em 0
  box-sizing border-box
  a
    text-decoration none
    i
      color #999
      font-size 12px
      font-style normal
    p
      margin-top 5px
      color $accentColor
      font-size 14px
  a.prev
    float left
    text-align left
  a.next
    float right
    text-align right
</style>
