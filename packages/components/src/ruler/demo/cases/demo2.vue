<template>
  <div class="md-example-child md-example-child-single-component">
    <p class="title">当前值：{{ value }}</p>
    <div class="container">
      <md-ruler
        :scope="scope"
        :step="100"
        :unit="10"
        :max="2000"
        :min="1000"
        v-model="value"
      ></md-ruler>
    </div>
    <md-button size="small" inline @click="value = 1500">设置1500</md-button>
  </div>
</template>

<script>
import Button from 'mand-mobile/lib/button'
import Ruler from 'mand-mobile/lib/ruler'

export default {
  components: {
    'md-button': Button,
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
    title: '触发',
  },
  'en-US': {
    title: 'trigger',
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
  margin: 20px 0;
  border-radius: 6px;
  background: #FFF;
}
</style>
