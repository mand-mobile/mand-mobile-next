<template>
  <div class="md-example detail-item">
    <section class="md-example-section">
      <div class="md-example-title" v-html="demo[0].title || '基础'"></div>
      <div class="md-example-content">
        <Demo0 />
      </div>
    </section>
	</div>
</template>

<script>
// import createDemoModule from '../../../examples/create-demo-module'
import Demo0 from './cases/demo0'
// export default {...createDemoModule('detail-item', [Demo0])}
export default {
  name: `detail-item-demo`,
  components: {
    Demo0,
  },
  data() {
    return {
      demo: [Demo0]
    }
  },
}
</script>
