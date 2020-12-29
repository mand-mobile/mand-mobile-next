<template>
  <div class="md-example-child md-example-child-icon md-example-child-icon-1">
    <div class="md-example-item">
      <md-icon name="spinner" size="lg" style="-webkit-filter:invert(1)"></md-icon>
      <p class="icon-name">spinner</p>
    </div>
    <div class="md-example-item">
      <md-icon name="success-color" size="lg" svg></md-icon>
      <p class="icon-name">success-color</p>
    </div>
    <div class="md-example-item">
      <md-icon name="fail-color" size="lg" svg></md-icon>
      <p class="icon-name">fail-color</p>
    </div>
    <div class="md-example-item">
      <md-icon name="warn-color" size="lg" svg></md-icon>
      <p class="icon-name">warn-color</p>
    </div>
  </div>
</template>

<script>
import Icon from 'mand-mobile/lib/icon'

export default {
  components: {
    'md-icon': Icon,
  },
}
// #region ignore
export const metaInfo = {
  platform: 'web',
  hideCode: true,
  'zh-CN': {
    title: 'SVG图标',
  },
  'en-US': {
    title: 'Svg Icon',
  },
}
// #endregion ignore

</script>

<style scoped>
.md-example-child-icon {
  padding: 32px 32px 0;
  background-color: #FFF;
}
.md-example-child-icon .md-example-item {
  display: inline-flex;
  flex-direction: column;
  align-items: center;
  width: 33.3%;
  margin-bottom: 32px;
}
.md-example-child-icon .md-example-item .icon-name {
  margin-top: 5px;
  font-size: 18px;
  color: #666;
}
</style>