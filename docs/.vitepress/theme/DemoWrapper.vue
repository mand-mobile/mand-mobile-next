<script setup lang="ts">
import { defineProps, shallowReactive } from 'vue'
import { useData } from 'vitepress'

const props = defineProps({
  demos: { type: Object, required: true },
})
const comps = props.demos
  ? shallowReactive(
      Object
        .entries(props.demos)
        .map((demo) => ({
          ...demo[1].default,
          showCodeExample: false,
        }))
    )
  : []
</script>

<template>
  <article class="demo-wrapper m-auto <lg:justify-center lg:justify-between" v-bind="$attrs">
    <div
      v-for="(demo, index) in comps"
      :key="index"
      class="
        md-example-section
        flex flex-col
        mb-16 rounded-lg border-1 border-primary border-solid
      "
    >
      <div
        class="
          md-example-title text-3xl py-4 px-4 text-true-gray-600 font-600
          <sm:text-xl <sm:py-2
        "
        v-text="demo.title"
      ></div>
      <div
        v-if="demo.describe"
        class="md-example-describe text-2xl my-2 <sm:text-lg <sm:my-1 "
        v-text="demo.describe"
      ></div>
      <div class="
          md-example-content
          flex-1 px-32 py-12
          <sm:p-4
        "
      >
        <component :is="demo" class="demo-component"></component>
      </div>
      <div class="operations py-4 px-4 text-center">
        <fluent:clipboard-code-24-regular class="text-2xl cursor-pointer mr-8 <sm:text-xl" />
        <ant-design:code-outlined class="text-2xl cursor-pointer <sm:text-xl" />
      </div>
      <div v-if="demo.showCodeExample" class="md-example-code">
        666
      </div>
    </div>
  </article>
</template>

<style lang="stylus">
.demo-wrapper {
  max-width: 100%;
  zoom: .5;
  display: flex;
  flex-wrap: wrap;
}

.demo-wrapper::after {
  content: '';
  flex: 0 0 45%;
}

.demo-wrapper > div {
  flex: 0 0 45%;
}

.md-example-title {
  border-bottom: 1px solid  #eee;
}

.operations {
  border-top: 1px dashed  #eee;
}

@media (max-width: 640px) {
  .demo-wrapper {
    max-width: 100%;
  }

  .demo-wrapper > div {
    flex: 0 0 100%;
  }

  .demo-component {
    width: auto;
    margin: 0 auto;
  }
}

@media (min-width: 640px) and (max-width: 1024px) {
  .demo-wrapper > div {
    flex: 0 0 100%;
  }
  .demo-component {
    width: 750px;
    margin: 0 auto;
  }
}

.demo-wrapper
  .md-button
    margin-bottom 12px
    &.inline, &.link
      margin-right 12px
</style>
