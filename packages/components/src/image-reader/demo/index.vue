<template>
  <div class="md-example image-reader">
    <section class="md-example-section">
      <div class="md-example-title" v-text="demo[0].title || '基础'"></div>
      <div class="md-example-describe" v-text="demo[0].describe"></div>
      <div class="md-example-content">
        <Demo0 />
      </div>
    </section>
    <section class="md-example-section">
      <div class="md-example-title" v-text="demo[1].title || '基础'"></div>
      <div class="md-example-describe" v-text="demo[1].describe"></div>
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

// export default { ...createDemoModule('image-reader', [Demo0, Demo1]) }
export default {
  name: 'image-reader',
  components: {
    Demo0,
    Demo1
  },
  data() {
    return {
      demo: [Demo0, Demo1]
    }
  }
}
</script>


