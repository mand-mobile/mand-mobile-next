<template>
  <div class="md-example">
    <section class="md-example-section">
      <div class="md-example-title" v-text="demos[0].title || '基础'"></div>
      <div class="md-example-describe" v-text="demos[0].describe"></div>
      <div class="md-example-content">
        <demo0 />
      </div>
    </section>
    <section class="md-example-section">
      <div class="md-example-title" v-text="demos[1].title || '基础'"></div>
      <div class="md-example-describe" v-text="demos[1].describe"></div>
      <div class="md-example-content">
        <demo1 />
      </div>
    </section>
    <!-- <section class="md-example-section">
      <div class="md-example-title" v-html="demos[2].title || '基础'"></div>
      <div class="md-example-describe" v-html="demos[2].describe"></div>
      <div class="md-example-content">
        <demo2 />
      </div>
    </section> -->
  </div>
</template>

<script>
import Demo0 from './cases/demo0'
import Demo1 from './cases/demo1'
// import Demo2 from './cases/demo2'

export default {
  name: `skeleton-demo`,
  components: {
    Demo0,
    Demo1,
    // Demo2,
  },
  data() {
    return {
      demos: [Demo0, Demo1],
    }
  },
}
</script>

<style lang="stylus" scoped>
.md-example-content
  padding 16px
  background color-bg-base
</style>
