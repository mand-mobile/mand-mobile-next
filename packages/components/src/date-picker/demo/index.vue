<template>
  <div class="md-example date-picker">
    <section class="md-example-section">
      <div class="md-example-title">基础</div>
      <div class="md-example-describe"></div>
      <div class="md-example-content">
        <Demo0/>
      </div>
    </section>
    <section class="md-example-section">
      <div class="md-example-title">时间选择</div>
      <div class="md-example-describe"></div>
      <div class="md-example-content">
        <Demo1/>
      </div>
    </section>
    <section class="md-example-section">
      <div class="md-example-title">日期&时间选择</div>
      <div class="md-example-describe"></div>
      <div class="md-example-content">
        <Demo2/>
      </div>
    </section>
    <section class="md-example-section">
      <div class="md-example-title">日期&自定义类型和选项文案值</div>
      <div class="md-example-describe"></div>
      <div class="md-example-content">
        <Demo3/>
      </div>
    </section>
	</div>
</template>

<script>
import Demo0 from './cases/demo0'
import Demo1 from './cases/demo1'
import Demo2 from './cases/demo2'
import Demo3 from './cases/demo3'

export default {
  components: {
    Demo0,
    Demo1,
    Demo2,
    Demo3,
  },
}

</script>