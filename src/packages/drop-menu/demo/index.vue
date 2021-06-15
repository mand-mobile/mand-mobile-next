<template>
  <div class="md-nav">
    <p class="home" @click="$router.push('/')">
      <md-icon name="home" size="lg"></md-icon>
    </p>
    <p class="name">DropMenu</p>
    <p class="name-zh">组件中文名称</p>
  </div>
  <div class="md-example drop-menu">
    <section
      v-for="(demo, index) in demos"
      :key="index"
      class="md-example-section"
    >
      <div
        class="md-example-title"
        v-text="demo.title || '基础'"
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
  'DropMenu',
  Object.entries(demos).map((demo) => demo[1].default)
)
</script>

<style lang="stylus">
.md-example.drop-menu
  .md-example-section
    position relative
    .md-example-child
      position relative
      height 400px
      background color-bg-base
      overflow hidden
      .md-drop-menu
        position absolute
        float left
        width 100%
        height 100%
        .md-drop-menu-bar
          height drop-menu-height
        .md-popup
          position absolute
      .content
        font-size font-body-normal
        text-align center
        line-height 400px
</style>
