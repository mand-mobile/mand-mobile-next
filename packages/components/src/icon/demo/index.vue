<template>
  <div class="md-example icon">
    <section class="md-example-section">
      <div class="md-example-title" v-text="'基础'"></div>
      <!-- <div class="md-example-descibe" v-text="demo.descibe"></div> -->
      <div class="md-example-content">
        <!-- <component :is="demo"></component> -->
        <Demo0 />
      </div>
      <div class="md-example-title" v-text="'大小'"></div>
      <div class="md-example-content">
        <Demo2 />
      </div>
      <div class="md-example-title" v-text="'颜色'"></div>
      <div class="md-example-content">
        <Demo3 />
      </div>
    </section>
	</div>
</template>

<script>
// import createDemoModule from '../../../examples/create-demo-module'
import Demo0 from './cases/demo0'
import Demo2 from './cases/demo2'
import Demo3 from './cases/demo3'

export default {
  components: {
    Demo0,
    Demo2,
    Demo3,
  },
  data() {
    return {
      demo: Demo0,
    }
  }
}

</script>

<style lang="stylus">
.md-example-title
  padding 16px 24px
  text-align left
.md-example-child-icon
  padding-top 20px
  background #FFF
  clearfix()
  .md-example-item, .md-example-item-s
    float left
    width 25%
    height 100px
    padding 15px 0
    color #333
    text-align center
    .md-icon
      margin 0 auto
      color #111A34
    p
      text-align center
      font-size font-body-normal
      color #999
  .md-example-item-s
    width 25%
</style>
