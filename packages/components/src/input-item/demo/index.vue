<template>
  <div class="md-example input-item">
    <section class="md-example-section">
      <div class="md-example-title" v-text="'基础'"></div>
      <!-- <div class="md-example-describe" v-html="demo.describe"></div> -->
      <div class="md-example-content">
        <Demo0 />
      </div>
    </section>
    <section class="md-example-section">
      <div class="md-example-title" v-text="'标题浮动输入框'"></div>
      <!-- <div class="md-example-describe" v-html="demo.describe"></div> -->
      <div class="md-example-content">
        <Demo1 />
      </div>
    </section>
	</div>
</template>

<script>
// import createDemoModule from '../../../examples/create-demo-module'
import Demo0 from './cases/demo0'
import Demo1 from './cases/demo1'
// import Demo2 from './cases/demo2'
// import Demo3 from './cases/demo3'
// import Demo4 from './cases/demo4'
// import Demo5 from './cases/demo5'

export default {
  components: {
    Demo0,
    Demo1,
  },
  // ...createDemoModule('input-item', [Demo0, Demo1, Demo2, Demo3, Demo4, Demo5]),
}
</script>
