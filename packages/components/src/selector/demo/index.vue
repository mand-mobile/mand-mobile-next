<template>
  <div class="md-example selecotor">
    <section class="md-example-section">
      <div class="md-example-title">无需确认</div>
      <div class="md-example-describe"></div>
      <div class="md-example-content">
        <Demo0/>
      </div>
    </section>
    <section class="md-example-section">
      <div class="md-example-title">自定义选项</div>
      <div class="md-example-describe">uniapp不支持</div>
      <div class="md-example-content">
        <Demo1/>
      </div>
    </section>
    <section class="md-example-section">
      <div class="md-example-title">确认模式</div>
      <div class="md-example-describe"></div>
      <div class="md-example-content">
        <Demo2/>
      </div>
    </section>
    <section class="md-example-section">
      <div class="md-example-title">Check模式</div>
      <div class="md-example-describe">有图标提示是否选中</div>
      <div class="md-example-content">
        <Demo3/>
      </div>
    </section>
    <section class="md-example-section">
      <div class="md-example-title">多选Check模式</div>
      <div class="md-example-content">
        <Demo4/>
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
import Demo4 from './cases/demo4'

export default {
  components: {
    Demo0,
    Demo1,
    Demo2,
    Demo3,
    Demo4
  }
}

</script>
