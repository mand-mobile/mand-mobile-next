<template>
  <div class="md-example-child md-example-child-water-mark-0">
    <md-water-mark
      class="text-container"
      spacing="10vw"
    >
      <p class="text">
        通过<b>作用域插槽</b>的坐标属性(coord)可以对水印行列进行定制
      </p>
      <p class="text">
        通过<b>作用域插槽</b>的坐标属性(coord)可以对水印行列进行定制
      </p>
      <p class="text">
        通过<b>作用域插槽</b>的坐标属性(coord)可以对水印行列进行定制
      </p>
      <template slot="watermark" >
        <span>水印</span>
      </template>
    </md-water-mark>
	</div>
</template>

<script>// import WaterMark from '../../index.web.vue'
import WaterMark from '../../index'

export default {
  name: 'water-mark-demo',
  /* DELETE */
  title: '使用插槽',
  titleEnUS: 'Using slots',
  /* DELETE */
  components: {
    'md-water-mark': WaterMark,
  },
}
</script>

<style>
.md-example-child-water-mark-0 .text-container{
  display: block;
  padding: 32px;
  background: #FFF;
}
.md-example-child-water-mark-0 .text{
  line-height: 1.5;
  margin-bottom: 20px;
  font-size: 24px;
  text-indent: 2em;
}
</style>