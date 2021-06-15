<template>
  <div class="md-nav">
    <p class="home" @click="$router.push('/')">
      <md-icon name="home" size="lg"></md-icon>
    </p>
    <p class="name">Button</p>
    <p class="name-zh">按钮</p>
  </div>
  <div class="md-example button">
    <section
      v-for="(demo, index) in demos"
      :key="index"
      class="md-example-section"
    >
      <div
        class="md-example-title"
        v-text="demo.title"
      ></div>
      <div
        class="md-example-describe"
        v-text="demo.describe"
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
  'Button',
  Object.entries(demos).map((demo) => demo[1].default)
)
</script>
<style lang="stylus">
.md-example.button
  .md-example-section
    float left
    width 100%
    margin-bottom 12px
    h1
      margin-bottom 12px
      color #111A34
      font-size font-heading-normal
      font-weight normal
    .md-button
      // float left
      margin-bottom 12px
      &.inline, &.link
        margin-right 12px
    .md-example-box
      position relative
      float left
      width 100%
      hairline(top)
      .md-example-box-content
        float left
        width 100%
        padding 60px h-gap-lg
        color color-text-base
        font-size font-minor-large
        text-align left
        background color-bg-base
        box-sizing border-box
        line-height 1.5
        text-indent 2em
      .md-button
        margin 0
</style>
