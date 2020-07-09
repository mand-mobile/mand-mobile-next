<template>
  <div class="md-example bill">
    <section class="md-example-section" >
      <div class="md-example-title" v-html="'基础'"></div>
      <div class="md-example-describe" v-html="''"></div>
      <div class="md-example-content">
        <Demo0 />
      </div>
    </section>
	</div>
</template>

<script>
import Demo0 from './cases/demo0'
// import Demo1 from './cases/demo1'

export default {
  name: `button-demo`,
  components: {
    Demo0,
    // Demo1,
    // Demo2,
    // Demo3,
  },
  data() {
    return {
    }
  },
}


</script>

<style lang="stylus">
.md-example.bill
  position relative
</style>