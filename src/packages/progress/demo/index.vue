<template>
  <div class="md-nav">
    <p class="home" @click="$router.push('/')">
      <md-icon name="home" size="lg"></md-icon>
    </p>
    <p class="name">Progress</p>
    <p class="name-zh">进度</p>
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
import { createDemoModule } from 'mand-mobile-next/utils/index'
const demos = import.meta.globEager('./demo*.vue')
export default createDemoModule(
  'Progress',
  Object.entries(demos).map((demo) => demo[1].default)
)
</script>

<style lang="stylus"></style>
