<template>
  <div class="md-example dialog">
    <Demo0 />
    <p>单例模式</p>
    <Demo1 />
  </div>
</template>

<script>
// import createDemoModule from '../../../examples/create-demo-module'
import Demo0 from './cases/demo0'
import Demo1 from './cases/demo1'

// export default {
//   ...createDemoModule('button', [Demo0, Demo1, Demo2, Demo3, Demo4]),
// }

export default {
  name: `button-demo`,
  components: {
    Demo0,
    Demo1,
  },
  data() {
    return {
      demo: [Demo0, Demo1],
    }
  },
}
</script>

<style lang="stylus">
.md-example-child-dialog .md-button
  margin-bottom 20px
</style>
