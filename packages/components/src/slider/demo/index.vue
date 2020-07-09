<template>
  <div class="md-example slider">
    <section class="md-example-section">
      <div class="md-example-title" v-html="demos[0].title || '基础'"></div>
      <div class="md-example-content">
        <Demo0/>
      </div>
    </section>
    <section class="md-example-section">
      <div class="md-example-title" v-html="demos[1].title || '禁用'"></div>
      <div class="md-example-content">
        <Demo1/>
      </div>
    </section>
    <section class="md-example-section">
      <div class="md-example-title" v-html="demos[2].title || '格式化'"></div>
      <div class="md-example-content">
        <Demo2/>
      </div>
    </section>
    <section class="md-example-section">
      <div class="md-example-title" v-html="demos[3].title || '范围'"></div>
      <div class="md-example-content">
        <Demo3/>
      </div>
    </section>
    <section class="md-example-section">
      <div class="md-example-title" v-html="demos[4].title || '步长'"></div>
      <div class="md-example-content">
        <Demo4/>
      </div>
    </section>
    <section class="md-example-section">
      <div class="md-example-title" v-html="demos[5].title || '边界值'"></div>
      <div class="md-example-content">
        <Demo5/>
      </div>
    </section>
	</div>
</template>

<script>
import Demo0 from './cases/demo0'
import Demo1 from './cases/demo1'
import Demo2 from './cases/demo2'
import Demo3 from './cases/demo3'
import Demo4 from './cases/demo4'
import Demo5 from './cases/demo5'

export default {
  name: 'slider-demo',
  components: {
    Demo0,
    Demo1,
    Demo2,
    Demo3,
    Demo4,
    Demo5,
  },
  data() {
    return {
      demos: [Demo0, Demo1, Demo2, Demo3, Demo4, Demo5],
    };
  },
};
</script>

<style lang="stylus">
.md-example.slider
  position relative
</style>
