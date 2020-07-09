<template>
  <div class="md-example cell-item">
    <section class="md-example-section">
      <div class="md-example-title" v-text="demo[0].title || '基础'"></div>
      <div class="md-example-content">
        <Demo0 />
      </div>
    </section>
    <section class="md-example-section">
      <div class="md-example-title" v-text="demo[1].title || '单行列表'"></div>
      <div class="md-example-content">
        <Demo1 />
      </div>
    </section>
    <section class="md-example-section">
      <div class="md-example-title" v-text="demo[2].title || '多行列表'"></div>
      <div class="md-example-content">
        <Demo2 />
      </div>
    </section>

	</div>
</template>

<script>
// import createDemoModule from '../../../examples/create-demo-module'
import Demo0 from './cases/demo0'
import Demo1 from './cases/demo1'
import Demo2 from './cases/demo2'
// export default {...createDemoModule('cell-item', [Demo0, Demo1, Demo2])}

export default {
  name: `cell-item-demo`,
  components: {
    Demo0,
    Demo1,
    Demo2,
  },
  data() {
    return {
      demo: [Demo0, Demo1, Demo2]
    }
  },
}

</script>
