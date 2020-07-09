<template>
  <div class="md-example swiper">
    <section class="md-example-section">
      <div class="md-example-title">横向轮播</div>
      <div class="md-example-describe"></div>
      <div class="md-example-content">
        <Demo0/>
      </div>
    </section>
    <section class="md-example-section">
      <div class="md-example-title">纵向轮播</div>
      <div class="md-example-describe"></div>
      <div class="md-example-content">
        <Demo1/>
      </div>
    </section>
    <section class="md-example-section">
      <div class="md-example-title">渐隐轮播</div>
      <div class="md-example-describe"></div>
      <div class="md-example-content">
        <Demo2/>
      </div>
    </section>
    <section class="md-example-section">
      <div class="md-example-title">每屏多内容</div>
      <div class="md-example-describe"></div>
      <div class="md-example-content">
        <Demo3/>
      </div>
    </section>
	</div>
</template>

<script>
// import createDemoModule from '../../../examples/create-demo-module'
import Demo0 from './cases/demo0'
import Demo1 from './cases/demo1'
import Demo2 from './cases/demo2'
import Demo3 from './cases/demo3'

export default {
  components: {
    Demo0,
    Demo1,
    Demo2,
    Demo3
  }
}

</script>

<style lang="stylus">
.md-example.swiper
  .md-example-content
    width 100%
    margin-bottom 20px
  .md-example-title
    a
      background #3ca0e6
      color #fff
      padding 5px 10px
      border-radius 4px
      font-size 24px
      line-height 28px
</style>