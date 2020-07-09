<template>
  <div class="md-example water-mark">
    <section class="md-example-section">
      <div class="md-example-title" v-text="'基础'"></div>
      <div class="md-example-content">
        <Demo0 />
      </div>
    </section>
    <section class="md-example-section">
      <div class="md-example-title" v-text="'插槽'"></div>
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

export default {
  name: `water-mark-demo`,
  components: {
    Demo0,
    Demo1,
  },
}

</script>

<style lang="stylus">
.md-example.water-mark
  position relative
</style>