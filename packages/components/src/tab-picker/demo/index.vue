<template>
  <div class="md-example tab-picker">
    <section class="md-example-section">
      <div class="md-example-title" v-text="'基础'"></div>
      <div class="md-example-content">
        <Demo0 />
      </div>
    </section>
	</div>
</template>

<script>
import Demo0 from './cases/demo0'

export default {
  components: {
    Demo0
  }
}

</script>
