<template>
  <div class="md-example-child md-example-child-water-mark">
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
      <template slot="watermark" slot-scope="{ coord }">
        <span>水印（{{coord.row}}-{{coord.col}}）</span>
      </template>
    </md-water-mark>
	</div>
</template>

<script>
import WaterMark from 'mand-mobile/lib/water-mark'

export default {
  components: {
    'md-water-mark': WaterMark,
  },
}
// #region ignore
export const metaInfo = {
  'zh-CN': {
    title: '使用插槽',
  },
  'en-US': {
    title: 'Using slots',
  },
  platform: 'web',
}
// #endregion ignore

</script>

<style scoped>
.md-example-child-water-mark .text-container{
  display: block;
  padding: 32px;
  background: #FFF;
}
.md-example-child-water-mark .text{
  line-height: 1.5;
  margin-bottom: 20px;
  font-size: 24px;
  text-indent: 2em;
}
</style>