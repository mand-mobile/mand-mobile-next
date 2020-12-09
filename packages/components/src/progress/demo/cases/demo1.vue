<template>
  <div class="md-example-child md-example-child-progress">
    <md-progress
      :value="0.8"
      :width="10"
      :size="150"
      color="url(#linear)"
      border-color="#FFF"
      linecap="butt"
    >
      <span class="progress-value">80%</span>
      <defs slot="defs">
        <linearGradient id="linear" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%"   stop-color="#FF5257"/>
          <stop offset="100%" stop-color="#FFC541D6"/>
        </linearGradient>
      </defs>
    </md-progress>
    <md-progress
      :value="0.8"
      :width="10"
      :size="150"
      :rotate="-90"
      color="#FF5257"
      transition
    >
      <div class="progress-value">
        <md-amount
          :value="80"
          :precision="0"
          transition
        ></md-amount>%
      </div>
    </md-progress>
  </div>
</template>

<script>
import Amount from 'mand-mobile/lib/amount'
import Progress from 'mand-mobile/lib/progress'
export default {
  components: {
    'md-amount': Amount,
    'md-progress': Progress,
  },
}
// #region ignore
export const metaInfo = {
  platform: 'web',
  'zh-CN': {
    title: '其他配置',
  },
  'en-US': {
    title: 'Other configurations',
  },
}
// #endregion ignore

</script>

<style lang="stylus">
.md-example-child-progress {
  display: flex;
  justify-content: center;
}
.md-progress {
  margin: 0 10px;
}
.progress-value {
  font-size: 24px;
  font-family: DINPro-Medium;
}
</style>