<template>
  <div class="md-example agree">
    <section class="md-example-section">
      <div class="md-example-title" v-text="demo[0].title || '选中状态'"></div>
      <div class="md-example-content">
          <Demo0 />
      </div>
    </section>
    <section class="md-example-section">
      <div class="md-example-title" v-text="demo[1].title || '未选中状态'"></div>
      <div class="md-example-content">
          <Demo1 />
      </div>
    </section>
        <section class="md-example-section">
      <div class="md-example-title" v-text="demo[2].title || '选中不可用状态'"></div>
      <div class="md-example-content">
          <Demo2 />
      </div>
    </section>
    <section class="md-example-section">
      <div class="md-example-title" v-text="demo[3].title || '未选中不可用状态'"></div>
      <div class="md-example-content">
          <Demo3 />
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
  name: "agree-example",
  components: {
    Demo0,
    Demo1,
    Demo2,
    Demo3,
  },
  data() {
    return {
      demo: [Demo0, Demo1, Demo2, Demo3]
    }
  },
}

</script>

<style lang="stylus">
.md-example.agree
  .md-example-content
    padding 16upx 24upx
    font-size 24upx
    background color-bg-base
    .md-agree-content
      color #858B9C
      a
        color #5878B4
</style>
