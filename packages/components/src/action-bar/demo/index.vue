<template>
  <div class="md-example action-bar">
    <section class="md-example-section">
      <div class="md-example-title" v-text="demo[0].title || '基础'"></div>
      <div class="md-example-content">
         <Demo0 />
      </div>
    </section>
    <section class="md-example-section">
      <div class="md-example-title" v-text="demo[1].title || '基础'"></div>
      <div class="md-example-content">
         <Demo1 />
      </div>
    </section>
    <section class="md-example-section">
      <div class="md-example-title" v-text="demo[2].title || '基础'"></div>
      <div class="md-example-content">
         <Demo2 />
      </div>
    </section>
    <section class="md-example-section">
      <div class="md-example-title" v-text="demo[3].title || '基础'"></div>
      <div class="md-example-content">
         <Demo3 />
      </div>
    </section>
	</div>
</template>

<script>
// import createDemoModule from '../../../examples/create-demo-module'
import Demo0 from './cases/demo0'
import Demo1 from './cases/demo1'
import Demo2 from './cases/demo2'
import Demo3 from './cases/demo3'

// export default {
//   ...createDemoModule('action-bar', [Demo0, Demo1, Demo2, Demo3]),
// }

export default {
  name: `action-bar-demo`,
  components: {
    Demo0,
    Demo1,
    Demo2,
    Demo3,
  },
  data() {
    return {
      demo: [Demo0, Demo1, Demo2, Demo3]
      // demo: [Demo0]
    }
  },
}
</script>

<style lang="stylus">
.md-example.action-bar
  .md-example-section
    .md-action-bar
      position relative !important
</style>