<template>
  <div class="md-example image-viewer">
    <section class="md-example-section">
      <div class="md-example-title" v-text="'基础'"></div>
      <!-- <div class="md-example-describe" v-html="demo.describe"></div> -->
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
  components: {
    Demo0,
  }
}

</script>


