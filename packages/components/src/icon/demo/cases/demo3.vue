<template>
  <div class="md-example-child md-example-child-icon md-example-child-icon-3">
    <div class="md-example-item">
      <md-icon name="security" color="gray"></md-icon>
      <p class="icon-name">gray</p>
    </div>
    <div class="md-example-item">
      <md-icon name="security" color="orange"></md-icon>
      <p class="icon-name">orange</p>
    </div>
    <div class="md-example-item">
      <md-icon name="security" color="blue"></md-icon>
      <p class="icon-name">blue</p>
    </div>
    <div class="md-example-item">
      <md-icon name="security" color="purple"></md-icon>
      <p class="icon-name">purple</p>
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
    title: '颜色',
  },
  'en-US': {
    title: 'Icon color',
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
  width: 25%;
  margin-bottom: 32px;
}
.md-example-child-icon .md-example-item .icon-name {
  margin-top: 5px;
  font-size: 18px;
  color: #666;
}
</style>
