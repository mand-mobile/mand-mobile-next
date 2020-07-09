<template>
  <div class="md-example activity-indicator">
    <section class="md-example-section" v-for="(demo, index) in demos" :key="index">
      <div class="md-example-title" v-html="demo.title"></div>
      <div class="md-example-describe" v-html="demo.describe"></div>
      <div class="md-example-content">
        <!-- <component :is="demo"></component> -->
      </div>
    </section>
	</div>
</template>

<script>
// import Demo0 from './cases/demo0'
// import Demo1 from './cases/demo1'
// import Demo2 from './cases/demo2'

export default {
    name: `activity-indicator-demo`,
    data() {
      return {
        // demos: [Demo0, Demo1, Demo2],
      }
    },
  }

</script>

<style lang="stylus">
.md-example.activity-indicator
  position relative
</style>