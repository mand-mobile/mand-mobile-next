<template>
  <div class="md-example number-keyboard">
    <section class="md-example-section">
      <div class="md-example-title" v-text="'基础'"></div>
      <!-- <div class="md-example-describe" v-tex="demo.describe"></div> -->
      <div class="md-example-content">
        <Demo0 />
      </div>
    </section>
    <section class="md-example-section">
      <div class="md-example-title" v-text="'简单类型'"></div>
      <!-- <div class="md-example-describe" v-tex="demo.describe"></div> -->
      <div class="md-example-content">
        <Demo1 />
      </div>
    </section>
    <section class="md-example-section">
      <div class="md-example-title" v-text="'数字键乱序'"></div>
      <!-- <div class="md-example-describe" v-tex="demo.describe"></div> -->
      <div class="md-example-content">
        <Demo2 />
      </div>
    </section>
    <section class="md-example-section">
      <div class="md-example-title" v-text="'插槽'"></div>
      <!-- <div class="md-example-describe" v-tex="demo.describe"></div> -->
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
export default {
  components: {
    Demo0,
    Demo1,
    Demo2,
    Demo3,
  },
}

</script>
