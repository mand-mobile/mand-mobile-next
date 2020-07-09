<template>
  <div class="md-example stepper">
    <section class="md-example-section">
      <div class="md-example-title" v-text="demo[0].title || '基础'"></div>
      <div class="md-example-describe" v-text="demo[0].describe || '描述'"></div>
      <div class="md-example-content">
        <Demo0 />
      </div>
    </section>
    <section class="md-example-section">
      <div class="md-example-title" v-text="demo[1].title || '基础'"></div>
      <div class="md-example-describe" v-text="demo[1].describe || '描述'"></div>
      <div class="md-example-content">
        <Demo1 />
      </div>
    </section>
    <section class="md-example-section">
      <div class="md-example-title" v-text="demo[2].title || '基础'"></div>
      <div class="md-example-describe" v-text="demo[2].describe || '描述'"></div>
      <div class="md-example-content">
        <Demo2 />
      </div>
    </section>
    <section class="md-example-section">
      <div class="md-example-title" v-text="demo[3].title || '基础'"></div>
      <div class="md-example-describe" v-text="demo[3].describe || '描述'"></div>
      <div class="md-example-content">
        <Demo3 />
      </div>
    </section>
    <section class="md-example-section">
      <div class="md-example-title" v-text="demo[4].title || '基础'"></div>
      <div class="md-example-describe" v-text="demo[4].describe || '描述'"></div>
      <div class="md-example-content">
        <Demo4 />
      </div>
    </section>
    <section class="md-example-section">
      <div class="md-example-title" v-text="demo[5].title || '基础'"></div>
      <div class="md-example-describe" v-text="demo[5].describe || '描述'"></div>
      <div class="md-example-content">
        <Demo5 />
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
import Demo4 from './cases/demo4'
import Demo5 from './cases/demo5'

// export default {...createDemoModule('stepper', [Demo0, Demo1, Demo2, Demo3, Demo4, Demo5])}

export default {
  name: `stepper-demo`,
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
      demo: [Demo0, Demo1, Demo2, Demo3,Demo4,Demo5]
    }
  },
}
</script>

<style lang="stylus" scoped>
.md-example-section
  position relative
  // hairline(bottom, color-border-base)
</style>
