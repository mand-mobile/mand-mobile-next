<template>
  <div class="md-example toast">
    <section class="md-example-section">
      <div class="md-example-title">纯文字</div>
      <div class="md-example-content">
        <Demo0 />
      </div>
    </section>
    <section class="md-example-section">
      <div class="md-example-title">成功</div>
      <div class="md-example-content">
        <Demo1 />
      </div>
    </section>
    <section class="md-example-section">
      <div class="md-example-title">失败</div>
      <div class="md-example-content">
        <Demo2 />
      </div>
    </section>
    <section class="md-example-section">
      <div class="md-example-title">载入</div>
      <div class="md-example-content">
        <Demo3 />
      </div>
    </section>
    <section class="md-example-section">
      <div class="md-example-title">连续调用</div>
      <div class="md-example-content">
        <Demo4 />
      </div>
    </section>
    <section class="md-example-section">
      <div class="md-example-title">长文字</div>
      <div class="md-example-content">
        <Demo5 />
      </div>
    </section>
    <section class="md-example-section">
      <div class="md-example-title">自定义位置</div>
      <div class="md-example-content">
        <Demo6 />
      </div>
    </section>
	</div>
</template>

<script>
import Demo0 from './cases/demo0'
import Demo1 from './cases/demo1'
import Demo2 from './cases/demo2'
import Demo3 from './cases/demo3'
import Demo4 from './cases/demo4'
import Demo5 from './cases/demo5'
import Demo6 from './cases/demo6'
// import Demo7 from './cases/demo7'

export default {
  components: {
    Demo0,
    Demo1,
    Demo2,
    Demo3,
    Demo4,
    Demo5,
    Demo6,
    // Demo7
  },
}

</script>
