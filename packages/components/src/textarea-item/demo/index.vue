<template>
  <div class="md-example textarea-item">
    <section class="md-example-section">
      <div class="md-example-title" v-text="'普通文本域'"></div>
      <div class="md-example-content">
        <Demo0 />
      </div>
    </section>
    <section class="md-example-section">
      <div class="md-example-title" v-text="'错误提示'"></div>
      <div class="md-example-content">
        <Demo1 />
      </div>
    </section>
    <section class="md-example-section">
      <div class="md-example-title" v-text="'插槽'"></div>
      <div class="md-example-content">
        <Demo2 />
      </div>
    </section>
	</div>
</template>

<script>
// import createDemoModule from '../../../examples/create-demo-module'
import Demo0 from './cases/demo0.vue'
import Demo1 from './cases/demo1'
import Demo2 from './cases/demo2'
export default {
  name: `button-demo`,
  components: {
    Demo0,
    Demo1,
    Demo2,
  },
  data() {
    return {
    }
  },
}
</script>
