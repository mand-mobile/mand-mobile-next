<template>
  <div class="md-example notice-bar">
    <section class="md-example-section">
      <div class="md-example-title" v-text="demos[0].title || '基础'"></div>
      <div class="md-example-content">
        <demo0 />
      </div>
    </section>
    <section class="md-example-section">
      <div class="md-example-title" v-text="demos[1].title || '设置图标'"></div>
      <div class="md-example-content">
        <demo1 />
      </div>
    </section>
    <section class="md-example-section">
      <div class="md-example-title" v-text="demos[2].title || '设置时间'"></div>
      <div class="md-example-describe" v-text="demos[2].describe || '5s后隐藏'"></div>
      <div class="md-example-content">
        <demo2 />
      </div>
    </section>
    <section class="md-example-section">
      <div class="md-example-title" v-text="demos[3].title || '圆角'"></div>
      <div class="md-example-content">
        <demo3 />
      </div>
    </section>
    <section class="md-example-section">
      <div class="md-example-title" v-text="demos[4].title || '样式'"></div>
      <div class="md-example-content">
        <demo4 />
      </div>
    </section>
    <section class="md-example-section">
      <div class="md-example-title" v-text="demos[5].title || '多行显示'"></div>
      <div class="md-example-content">
        <demo5 />
      </div>
    </section>
    <section class="md-example-section">
      <div class="md-example-title" v-text="demos[6].title || '滚动播放'"></div>
      <div class="md-example-content">
        <demo6 />
      </div>
    </section>
    <section class="md-example-section">
      <div class="md-example-title" v-text="demos[7].title || '使用插槽自定义'"></div>
      <div class="md-example-content">
        <demo7 />
      </div>
    </section>
    <section class="md-example-section">
      <div class="md-example-title" v-text="demos[8].title || '动态插槽内容'"></div>
      <div class="md-example-content">
        <demo8 />
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
import Demo7 from './cases/demo7'
import Demo8 from './cases/demo8'

export default {
  name: `notice-bar-demo`,
  components: {
    Demo0,
    Demo1,
    Demo2,
    Demo3,
    Demo4,
    Demo5,
    Demo6,
    Demo7,
    Demo8,
  },
  data() {
    return {
      demos: [Demo0, Demo1, Demo2, Demo3, Demo4, Demo5, Demo6, Demo7, Demo8],
    }
  },
}
</script>
