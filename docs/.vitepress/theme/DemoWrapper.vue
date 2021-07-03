<script setup lang="ts">
import { defineProps, ref } from 'vue'
import { useData } from 'vitepress'

const props = defineProps({
  demos: { type: Object, required: true },
})
const comps = Object.entries(props.demos).map((demo) => demo[1].default)
</script>

<template>
  <article class="demo-wrapper m-auto <lg:justify-center lg:justify-between" v-bind="$attrs">
    <div
      v-for="(demo, index) in comps"
      :key="index"
      class="md-example-section"
    >
      <div
        class="md-example-title text-4xl my-4  <sm:text-xl <sm:my-2"
        v-text="demo.title"
      ></div>
      <div
        v-if="demo.describe"
        class="md-example-describe text-2xl my-2 <sm:text-lg <sm:my-1 "
        v-text="demo.describe"
      ></div>
      <div class="md-example-content">
        <component :is="demo"></component>
      </div>
    </div>
  </article>
</template>

<style lang="stylus">
.demo-wrapper {
  max-width: calc(750px * 2 + 128px);
  zoom: .5;
  display: flex;
  flex-wrap: wrap;
}

.demo-wrapper > div {
  flex: 0 0 750px;
}

@media (max-width: 640px) {
  .demo-wrapper {
    max-width: 100%;
  }

  .demo-wrapper > div {
    flex: 0 0 100%;
  }
}

.demo-wrapper
  .md-button
    margin-bottom 12px
    &.inline, &.link
      margin-right 12px
</style>
