<template>
  <div class="md-example action-sheet">
    <section class="md-example-section">
      <div class="md-example-title" v-html="'基础'"></div>
      <div class="md-example-content">
       <Demo0 />
      </div>
    </section>
    <section class="md-example-section">
      <div class="md-example-title" v-html="'单例模式'"></div>
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
  data(){
    return {
      demo: [ Demo0, Demo1]
    }
  }
}

</script>
