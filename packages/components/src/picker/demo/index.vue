<template>
  <div class="md-example picker">
    <section class="md-example-section">
      <div class="md-example-title">基础</div>
      <div class="md-example-describe"></div>
      <div class="md-example-content">
        <Demo0/>
      </div>
    </section>
    <section class="md-example-section">
      <div class="md-example-title">多级联动</div>
      <div class="md-example-describe"></div>
      <div class="md-example-content">
        <Demo1/>
      </div>
    </section>
    <section class="md-example-section">
      <div class="md-example-title">弹窗</div>
      <div class="md-example-describe"></div>
      <div class="md-example-content">
        <Demo2/>
      </div>
    </section>
	</div>
</template>

<script>
// import createDemoModule from '../../../examples/create-demo-module'
import Demo0 from './cases/demo0'
import Demo1 from './cases/demo1'
import Demo2 from './cases/demo2'

export default {
  components: {
    Demo0,
    Demo1,
    Demo2,
  },
}

</script>

<style lang="stylus">
.md-example.picker .md-example-title a
  font-size 20px !important
</style>

