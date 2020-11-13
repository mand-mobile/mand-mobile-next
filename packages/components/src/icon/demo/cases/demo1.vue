<template>
  <div class="md-example-child md-example-child-icon md-example-child-icon-1">
    <div class="md-example-item-s">
      <md-icon name="spinner" size="lg" style="-webkit-filter:invert(1)"></md-icon>
      <p>spinner</p>
    </div>
    <div class="md-example-item-s">
      <md-icon name="success-color" size="lg" svg></md-icon>
      <p>success-color</p>
    </div>
    <div class="md-example-item-s">
      <md-icon name="warn-color" size="lg" svg></md-icon>
      <p>warn-color</p>
    </div>
  </div>
</template>

<script>
import Icon from '../../../icon'

export default {
  components: {
    'md-icon': Icon,
  },
}
// #region ignore
export const metaInfo = {
  platform: 'web',
  'zh-CN': {
    title: 'SVG图标',
  },
  'en-US': {
    title: 'Svg Icon',
  },
}
// #endregion ignore

</script>
