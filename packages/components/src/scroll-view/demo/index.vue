<template>
  <div class="md-example textarea-item">
    <section class="md-example-section">
      <div class="md-example-title" v-text="'基础'"></div>
      <div class="md-example-content">
        <Demo0 />
      </div>
    </section>
    <section class="md-example-section">
      <div class="md-example-title" v-text="'横向滚动'"></div>
      <div class="md-example-content">
        <Demo1 />
      </div>
    </section>
    <section class="md-example-section">
      <div class="md-example-title" v-text="'下拉刷新'"></div>
      <div class="md-example-content">
        <Demo2 />
      </div>
    </section>
    <!-- <section class="md-example-section">
      <div class="md-example-title" v-text="'加载更多'"></div>
      <div class="md-example-content">
        <Demo3 />
      </div>
    </section>
    <section class="md-example-section">
      <div class="md-example-title" v-text="'粘性标题'"></div>
      <div class="md-example-content">
        <Demo4 />
      </div>
    </section> -->
	</div>
</template>

<script>
import Demo0 from './cases/demo0'
import Demo1 from './cases/demo1'
import Demo2 from './cases/demo2'
// import Demo3 from './cases/demo3'
// import Demo4 from './cases/demo4'
// import Demo5 from './cases/demo5'
// import Demo6 from './cases/demo6'

export default {
  name: `button-demo`,
  components: {
    Demo0,
    Demo1,
    Demo2,
    // Demo3,
    // Demo4,
  },
  data() {
    return {
    }
  },
}
</script>