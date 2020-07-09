<template>
  <div class="md-example single-component">
    <section class="md-example-section">
      <div class="md-example-title" v-html="demo[0].title"></div>
      <div class="md-example-describe" v-html="demo[0].describe"></div>
      <div class="md-example-content">
        <Demo0 />
      </div>
    </section>
    <section class="md-example-section">
      <div class="md-example-title" v-html="demo[1].title"></div>
      <div class="md-example-describe" v-html="demo[1].describe"></div>
      <div class="md-example-content">
        <Demo1 />
      </div>
    </section>
    <section class="md-example-section">
      <div class="md-example-title" v-html="demo[2].title"></div>
      <div class="md-example-describe" v-html="demo[2].describe"></div>
      <div class="md-example-content">
        <Demo2 />
      </div>
    </section>
    <section class="md-example-section">
      <div class="md-example-title" v-html="demo[3].title"></div>
      <div class="md-example-describe" v-html="demo[3].describe"></div>
      <div class="md-example-content">
        <Demo3 />
      </div>
    </section>
    <section class="md-example-section">
      <div class="md-example-title" v-html="demo[4].title"></div>
      <div class="md-example-describe" v-html="demo[4].describe"></div>
      <div class="md-example-content">
        <Demo4 />
      </div>
    </section>
     <section class="md-example-section">
      <div class="md-example-title" v-html="demo[5].title"></div>
      <div class="md-example-describe" v-html="demo[5].describe"></div>
      <div class="md-example-content">
        <Demo5 />
      </div>
    </section>
	</div>
</template>

<script>
// import createDemoModule from '../../../examples/create-demo-module'
// import Demo0 from './cases/demo0'
// import Demo1 from './cases/demo1'
// import Demo2 from './cases/demo2'
// import Demo3 from './cases/demo3'
// import Demo4 from './cases/demo4'
// import Demo5 from './cases/demo5'

// export default {
//   ...createDemoModule('check-group', [Demo0, Demo1, Demo2, Demo3, Demo4, Demo5]),
// }

import Demo0 from './cases/demo0'
import Demo1 from './cases/demo1'
import Demo2 from './cases/demo2'
import Demo3 from './cases/demo3'
import Demo4 from './cases/demo4'
import Demo5 from './cases/demo5'

export default {
  name: "check-example",
  components: {
    Demo0,
    Demo1,
    Demo2,
    Demo3,
    Demo4,
    Demo5
  },
  data() {
    return {
      // demo: [Demo0, Demo1, Demo2, Demo3]
      demo: [Demo0, Demo1, Demo2, Demo3, Demo4, Demo5]
    }
  },
}
</script>

<style lang="stylus">
.md-example.md-example-child-check
  position relative

.md-example 
  .md-example-section
    margin-bottom 0rpx
    .md-example-title
      padding 0rpx
</style>
