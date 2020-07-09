<template>
  <div class="md-example textarea-item">
    <section class="md-example-section">
      <div class="md-example-title" v-text="'普通'"></div>
      <div class="md-example-content">
        <Demo0 />
      </div>
    </section>
	</div>
</template>

<script>
// import createDemoModule from '../../../examples/create-demo-module'
import Demo0 from './cases/demo0'
export default {
  name: `button-demo`,
  components: {
    Demo0,
  },
  data() {
    return {
    }
  },
}
</script>
