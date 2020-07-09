<template>
  <div class="md-example popup">
    <section class="md-example-section">
      <div class="md-example-title" v-text="'基础'"></div>
      <div class="md-example-content">
        <Demo0 />
      </div>
    </section>
    <section class="md-example-section">
      <div class="md-example-title" v-text="'其他配置'"></div>
      <div class="md-example-content">
        <Demo1 />
      </div>
    </section>
	</div>
</template>

<script>
import Demo0 from './cases/demo0'
import Demo1 from './cases/demo1'

export default {
  components: {
    Demo0,
    Demo1
  },
}

</script>
