<template>
  <div class="md-example tab-bar">
    <section class="md-example-section">
      <div class="md-example-title" v-text="'基础'"></div>
      <div class="md-example-content">
        <Demo0 />
      </div>
    </section>
    <section class="md-example-section">
      <div class="md-example-title" v-text="'首屏数量'"></div>
      <div class="md-example-content">
        <Demo1 />
      </div>
    </section>
    <section class="md-example-section">
      <div class="md-example-title" v-text="'滚动'"></div>
      <div class="md-example-content">
        <Demo2 />
      </div>
    </section>
    <section class="md-example-section">
      <div class="md-example-title" v-text="'无下划线，有分割线'"></div>
      <div class="md-example-content">
        <Demo3 />
      </div>
    </section>
    <section class="md-example-section">
      <div class="md-example-title" v-text="'自定义内容'"></div>
      <div class="md-example-content">
        <Demo4 />
      </div>
    </section>
    <section class="md-example-section">
      <div class="md-example-title" v-text="'监听事件'"></div>
      <div class="md-example-content">
        <Demo5 />
      </div>
    </section>
    <section class="md-example-section">
      <div class="md-example-title" v-text="'手势切换'"></div>
      <div class="md-example-content">
        <Demo6 />
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
import Demo6 from './cases/demo6'

export default {
  components: {
    Demo0,
    Demo1,
    Demo2,
    Demo3,
    Demo4,
    Demo5,
    Demo6
  }
}

</script>
