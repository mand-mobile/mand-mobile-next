<template>
  <div class="md-example radio">
    <section class="md-example-section">
      <div class="md-example-title" v-html="demos[0].title || '普通单选项'"></div>
      <div class="md-example-content">
        <demo0 />
      </div>
    </section>
    <section class="md-example-section">
      <div class="md-example-title" v-html="demos[1].title || '表单项内联'"></div>
      <div class="md-example-content">
        <demo1 />
      </div>
    </section>
    <section class="md-example-section">
      <div class="md-example-title" v-html="demos[2].title || '列表模式'"></div>
      <div class="md-example-content">
        <demo2 />
      </div>
    </section>
    <section class="md-example-section">
      <div class="md-example-title" v-html="demos[3].title || '单选项组'"></div>
      <div class="md-example-content">
        <demo3 />
      </div>
    </section>
    <section class="md-example-section">
      <div class="md-example-title" v-html="demos[4].title || '单选框'"></div>
      <div class="md-example-content">
        <demo4 />
      </div>
    </section>
    <section class="md-example-section">
      <div class="md-example-title" v-html="demos[5].title || '单选框组'"></div>
      <div class="md-example-content">
        <demo5 />
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
  name: `radio-demo`,
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
