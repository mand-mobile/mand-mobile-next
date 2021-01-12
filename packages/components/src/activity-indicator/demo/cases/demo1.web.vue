<template>
  <div class="md-example-child md-example-child-activity-indicator md-example-child-activity-indicator-1">
    <md-activity-indicator
      type="spinner"
      :size="30"
      :text-size="20"
    >加载中...</md-activity-indicator>
    <div class="activity-indicator-container">
      <md-activity-indicator
        class="md-activity-indicator-css"
        type="ring"
        :size="30"
        :text-size="20"
        color="light"
      >加载中...</md-activity-indicator>
    </div>
	</div>
</template>

<script>
import ActivityIndicator from 'mand-mobile/lib/activity-indicator'

export default {
  components: {
    'md-activity-indicator': ActivityIndicator,
  },
}
// #region ignore
export const metaInfo = {
  title: 'Spinner & Ring',
  platform: 'web',
}
// #endregion ignore

</script>

<style scoped>
.md-example-child-activity-indicator-1 {
  display: flex;
  flex-direction: column;
  align-items: center;
}
  
.md-example-child-activity-indicator-1 .md-activity-indicator {
  margin-bottom: 30px;
}
  
.md-example-child-activity-indicator-1 .activity-indicator-container {
  margin-bottom: 30px;
  padding: 15px 20px;
  background: rgba(62, 75, 93, .8);
  border-radius: 12px;
}
  
.md-example-child-activity-indicator-1 .md-activity-indicator-css {
  margin-bottom: 0;
}
  
.md-example-child-activity-indicator-1 .md-activity-indicator-css .md-activity-indicator_svg {
  width: 40px !important;
  height: 40px !important;
}
    
.md-example-child-activity-indicator-1 .md-activity-indicator-css .md-activity-indicator-text {
  font-size: 28px !important;
}  
</style>