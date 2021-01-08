<template>
  <div class="md-example-child md-example-child-single-component">
    <p class="title">当前值：{{ value }}</p>
    <div class="container">
      <md-ruler
        v-model="value"
        scale-text-position="bottom"
        scale-text-color="#666"
        :scale-text-size="18"
        scale-text-font="DINPro-Medium,DIN Alternate,Helvetica Neue,Helvetica,PingFang SC,Hiragino Sans GB,Microsoft YaHei,微软雅黑,Arial,sans-serif"
        scale-mark-color="#2F86F6"
        :scope="scope"
        :step="100"
        :unit="10"
      ></md-ruler>
    </div>
  </div>
</template>

<script>
import Ruler from 'mand-mobile/lib/ruler'

export default {
  components: {
    'md-ruler': Ruler,
  },
  data() {
    return {
      value: 1300,
      scope: [1000, 2000],
    }
  },
}
// #region ignore
export const metaInfo = {
  'zh-CN': {
    title: '自定义刻度展示配置',
  },
  'en-US': {
    title: 'Scale configration',
  },
}
// #endregion ignore

</script>

<style scoped>
.md-example-child-single-component .title {
  font-size: 22px;
  color: #999;
}
.md-example-child-single-component .container {
  margin-top: 20px;
  border-radius: 6px;
  background: #FFF;
}
</style>
