<template>
  <div class="md-example switch">
    <section class="md-example-section">
      <div class="md-example-title" v-html="demos[0].title || '基础'"></div>
      <div class="md-example-content">
        <Demo0/>
      </div>
    </section>
    <section class="md-example-section">
      <div class="md-example-title" v-html="demos[1].title || '关闭状态'"></div>
      <div class="md-example-content">
        <Demo1/>
      </div>
    </section>
    <section class="md-example-section">
      <div class="md-example-title" v-html="demos[2].title || '开启不可用状态'"></div>
      <div class="md-example-content">
        <Demo2/>
      </div>
    </section>
    <section class="md-example-section">
      <div class="md-example-title" v-html="demos[3].title || '关闭不可用状态'"></div>
      <div class="md-example-content">
        <Demo3/>
      </div>
    </section>
	</div>
</template>

<script>
import Demo0 from './cases/demo0'
import Demo1 from './cases/demo1'
import Demo2 from './cases/demo2'
import Demo3 from './cases/demo3'

export default {
  name: 'switch-demo',
  components: {
    Demo0,
    Demo1,
    Demo2,
    Demo3,
  },
  data() {
    return {
      demos: [Demo0, Demo1, Demo2, Demo3],
    };
  },
};
</script>

<style lang="stylus">
.md-example.switch
  position relative
</style>