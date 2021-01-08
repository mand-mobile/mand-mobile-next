<template>
  <div class="md-example-child md-example-child-single-component">
    <p class="title">当前值：{{ value }}</p>
    <div class="container">
      <md-ruler
        :scope="scope"
        :step="100"
        :unit="10"
        :max="1800"
        :min="1200"
        v-model="value"
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
      value: 1305,
      scope: [1000, 2000],
    }
  },
}
// #region ignore
export const metaInfo = {
  'zh-CN': {
    title: '最大1800，最小1200',
  },
  'en-US': {
    title: 'Max 1800, Min 1200',
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
