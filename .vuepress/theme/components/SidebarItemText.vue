<template>
  <div class="md-doc-sidebar_item_text">
    <template v-for="(text, index) in titleArr">
      <template v-if="!index">
        {{text}}
      </template>
      <template v-else>
        <span>{{text}}</span>
      </template>
    </template>
  </div>
</template>

<script>
export default {
  props: ['title'],
  computed: {
    titleArr () {
      return this.title.split(/\s+/)
    },
  }
}
</script>

<style lang="stylus" scoped>
.md-doc-sidebar_item_text
  padding .8em 1em
  font-size .9em
  color #314659
  transform translateX(2px)
  span
    margin-left .5em
    font-size .8em
    font-weight 400
    color #666f83
</style>