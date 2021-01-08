<template>
  <div class="md-example-child md-example-child-icon md-example-child-icon-2">
    <div class="md-example-item">
      <md-icon name="location" size="xs"></md-icon>
      <p class="icon-name">xs</p>
    </div>
    <div class="md-example-item">
      <md-icon name="location" size="sm"></md-icon>
      <p class="icon-name">sm</p>
    </div>
    <div class="md-example-item">
      <md-icon name="location" size="md"></md-icon>
      <p class="icon-name">md</p>
    </div>
    <div class="md-example-item">
      <md-icon name="location" size="lg"></md-icon>
      <p class="icon-name">lg</p>
    </div>
    <div class="md-example-item">
      <md-icon name="location" size="slg"></md-icon>
      <p class="icon-name">slg</p>
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
  'zh-CN': {
    title: '大小',
  },
  'en-US': {
    title: 'Icon size',
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
  width: 20%;
  margin-bottom: 32px;
}
.md-example-child-icon .md-example-item .icon-name {
  margin-top: 5px;
  font-size: 18px;
  color: #666;
}
</style>
