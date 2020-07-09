<template>
  <div class="md-example tag">
    <section class="md-example-section">
      <div class="md-example-title" v-text="'基础'"></div>
      <!-- <div class="md-example-describe" v-text="demo.describe"></div> -->
      <div class="md-example-content">
        <Demo0 />
      </div>
    </section>
    <section class="md-example-section">
      <div class="md-example-title" v-text="'圆角'"></div>
      <!-- <div class="md-example-describe" v-text="demo.describe"></div> -->
      <div class="md-example-content">
        <Demo1 />
      </div>
    </section>
    <section class="md-example-section">
      <div class="md-example-title" v-text="'线框'"></div>
      <!-- <div class="md-example-describe" v-text="demo.describe"></div> -->
      <div class="md-example-content">
        <Demo2 />
      </div>
    </section>
    <section class="md-example-section">
      <div class="md-example-title" v-text="'阳文'"></div>
      <!-- <div class="md-example-describe" v-text="demo.describe"></div> -->
      <div class="md-example-content">
        <Demo3 />
      </div>
    </section>
    <section class="md-example-section">
      <div class="md-example-title" v-text="'特殊标签'"></div>
      <!-- <div class="md-example-describe" v-text="demo.describe"></div> -->
      <div class="md-example-content">
        <Demo4 />
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

export default {
  components: {
    Demo0,
    Demo1,
    Demo2,
    Demo3,
    Demo4,
  },
}

</script>

<style lang="stylus">
.md-example-child-tag
  display flex
  align-items center
  padding v-gap-md h-gap-lg
  background color-bg-base
  .md-tag
    margin-right h-gap-sm
</style>
