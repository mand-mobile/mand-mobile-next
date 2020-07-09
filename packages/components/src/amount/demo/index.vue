<template>
  <div class="md-example amount">
    <section class="md-example-section">
      <div class="md-example-title" v-html="'基础'"></div>
      <div class="md-example-describe" v-html="demo[0].describe"></div>
      <div class="md-example-content">
        <Demo0 />
      </div>
    </section>
    <section class="md-example-section">
      <div class="md-example-title" v-html="'千位分隔符'"></div>
      <div class="md-example-describe" v-html="demo[1].describe"></div>
      <div class="md-example-content">
         <Demo1 />
      </div>
    </section>
    <section class="md-example-section">
      <div class="md-example-title" v-html="'变化动效'"></div>
      <div class="md-example-describe" v-html="demo[2].describe"></div>
      <div class="md-example-content">
         <Demo2 />
      </div>
    </section>
    <section class="md-example-section">
      <div class="md-example-title" v-html="'大写中文'"></div>
      <div class="md-example-describe" v-html="demo[3].describe"></div>
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
  name: `button-demo`,
  components: {
    Demo0,
    Demo1,
    Demo2,
    Demo3,
  },
  data() {
    return {
      demo: [Demo0, Demo1, Demo2, Demo3]
    }
  },
}

</script>

<style lang="stylus">
.md-example.amount
  position relative
</style>