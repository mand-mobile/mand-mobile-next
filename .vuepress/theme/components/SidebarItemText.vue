<template>
  <div class="md-doc-sidebar_item_text">
    <template v-for="(text, index) in titleArr">
      <template v-if="!index">
        {{text}}
      </template>
      <template v-else>
        <span>{{text}}</span>
      </template>
      <slot/>  
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
  padding 12px 16px
  font-size .9em
  color #314659
  transform translateX(2px)
  transition color .3s
  span
    margin-left .5em
    // font-size .8em
    font-weight 400
    color #a0a5b1
</style>

<style lang="stylus">
.dark
  .md-doc-sidebar_item_text
    color #f5f6f7 
</style>