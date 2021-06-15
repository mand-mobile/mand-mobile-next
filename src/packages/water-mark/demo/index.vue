<template>
  <div class="md-nav">
    <p class="home" @click="$router.push('/')">
      <md-icon name="home" size="lg"></md-icon>
    </p>
    <p class="name">WaterMark</p>
    <p class="name-zh">水印</p>
  </div>
  <div class="md-example water-mark">
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
  'WaterMark',
  Object.entries(demos).map((demo) => demo[1].default)
)
</script>

<style lang="stylus"></style>
