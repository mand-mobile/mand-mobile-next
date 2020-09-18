<template>
  <div class="md-doc-demo-wrapper" :class="{single}">
    <template v-if="paths && paths.length">
      <div class="md-doc-demo-wrapper_list">
        <template v-for="(path, index) in paths">
          <MDDemo
            v-if="!(index % 2)"
            :path="path"
            :key="index"
            :index="path"
          />
        </template>
      </div>
      <div class="md-doc-demo-wrapper_list" v-if="!single">
        <template v-for="(path, index) in paths">
          <MDDemo
            v-if="index % 2"
            :path="path"
            :key="index"
            :index="path"
          />
        </template>
      </div>
    </template>
    <template v-else>
      <div class="md-doc-demo-wrapper_list">
        <slot name="left"/>
      </div>
      <div class="md-doc-demo-wrapper_list" v-if="!single">
        <slot name="right"/>
      </div>
    </template>
    <slot/>
  </div>
</template>

<script>
export default {
 name: 'md-demo-wrapper',
 props: {
   paths: {
     type: Array
   },
   single: {
     type: Boolean,
     default: false
   }
 },
}
</script>

<style lang="stylus" scoped>
.md-doc-demo-wrapper
  display flex
  .md-doc-demo-wrapper_list
    width 49%
    &:nth-of-type(2n)
      margin-left 2%
  &.single .md-doc-demo-wrapper_list
    width 100%
    &:nth-of-type(2n)
      margin-left 0
    /deep/.md-doc-demo_content_case
      max-width unset
@media (max-width: 1500px)
  .md-doc-demo-wrapper
    display block
    .md-doc-demo-wrapper_list
      width 100%
  .md-doc-demo-wrapper .md-doc-demo-wrapper_list:nth-of-type(2n)
    margin-left 0
</style>