<template>
  <div class="md-example steps">
    <section class="md-example-section">
      <div class="md-example-title" v-html="'基础'"></div>
      <div class="md-example-content">
        <Demo0 />
      </div>
    </section>
    <section class="md-example-section">
      <div class="md-example-title" v-html="'进度非整数'"></div>
      <div class="md-example-content">
        <Demo1 />
      </div>
    </section>
    <section class="md-example-section">
      <div class="md-example-title" v-html="'自定义步骤图标'"></div>
      <div class="md-example-content">
        <Demo2 />
      </div>
    </section>
    <section class="md-example-section">
      <div class="md-example-title" v-html="'指定当前步骤'"></div>
      <div class="md-example-content">
        <Demo3 />
      </div>
    </section>
    <section class="md-example-section">
      <div class="md-example-title" v-html="'进度变化动效'"></div>
      <div class="md-example-content">
        <Demo4 />
      </div>
    </section>
    <section class="md-example-section">
      <div class="md-example-title" v-html="'利用current类增加自定义样式'"></div>
      <div class="md-example-content">
        <Demo5 />
      </div>
    </section>
    <section class="md-example-section">
      <div class="md-example-title" v-html="'完成全部步骤'"></div>
      <div class="md-example-content">
        <Demo6 />
      </div>
    </section>
    <section class="md-example-section">
      <div class="md-example-title" v-html="'纵向展示'"></div>
      <div class="md-example-content">
        <Demo7 />
      </div>
    </section>
    <section class="md-example-section">
      <div class="md-example-title" v-html="'自定义内容'"></div>
      <div class="md-example-content">
        不支持
        <!-- <Demo8 /> -->
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
import Demo6 from './cases/demo6'
import Demo7 from './cases/demo7'
// import Demo8 from './cases/demo8'

export default {
  name: 'slider-demo',
  components: {
    Demo0,
    Demo1,
    Demo2,
    Demo3,
    Demo4,
    Demo5,
    Demo6,
    Demo7,
    // Demo8,
  },
  data() {
    return {
    };
  },
};

</script>

<style lang="stylus" scoped>
.md-example-content
  background color-bg-base
</style>
