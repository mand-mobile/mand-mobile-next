<template>
  <div class="md-nav">
    <p class="home" @click="$router.push('/')">
      <md-icon name="home" size="lg"></md-icon>
    </p>
    <p class="name">Icon</p>
    <p class="name-zh">图标</p>
  </div>
  <div class="md-example icon">
    <section
      v-for="(demo, index) in demos"
      :key="index"
      class="md-example-section"
    >
      <div
        class="md-example-title"
        v-text="demo.title || '基础'"
      ></div>
      <div
        class="md-example-descibe"
        v-text="demo.descibe"
      ></div>
      <div class="md-example-content">
        <component :is="demo"></component>
      </div>
    </section>
  </div>
</template>

<script lang="ts">
import { createDemoModule } from '../../utils/index'

const demos = import.meta.globEager('./demo*.vue')

export default createDemoModule(
  'icon',
  Object.entries(demos).map((demo) => demo[1].default)
)
</script>

<style lang="stylus">
.md-example-child-icon
  padding-top 20px
  display flex
  flex-wrap wrap
  background #FFF
  .md-example-item, .md-example-item-s
    // height 100px
    padding 15px 0
    flex 0 0 25%
    overflow hidden
    color #333
    text-align center
    .md-icon
      margin 0 auto
      color #111A34
    p
      text-align center
      word-break break-all
      font-size font-body-normal
      color #999
  .md-example-item-s
    width 25%
</style>
