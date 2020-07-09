<template>
  <div class="md-example drop-menu">
    <section class="md-example-section">
      <div class="md-example-title" v-text="demo[0].title || '基础'"></div>
      <div class="md-example-content">
         <Demo0 />
      </div>
    </section>

    <section class="md-example-section">
      <div class="md-example-title" v-text="demo[1].title || '基础'"></div>
      <div class="md-example-content">
       <Demo1 />
      </div>
    </section>

    <section class="md-example-section">
      <div class="md-example-title" v-text="demo[2].title || '基础'"></div>
      <div class="md-example-content">
       <Demo2 />
      </div>
    </section>

    <section class="md-example-section">
      <div class="md-example-title" v-text="demo[3].title || '基础'"></div>
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
  name: `drop-menu-demo`,
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
.md-example.drop-menu
  .md-example-section
    position relative
    .md-example-content
      position relative
      min-height 300px
      background color-bg-base
      overflow hidden
      .md-drop-menu
        position absolute
        float left
        width 100%
        height 100%
        .md-drop-menu-bar
          height drop-menu-height
        .md-popup
          position absolute
      .content
        font-size font-body-normal
        text-align center
        line-height 400px
</style>