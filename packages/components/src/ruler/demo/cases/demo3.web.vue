<template>
  <div class="md-example-child md-example-child-single-component">
    <p class="title">当前值：{{ value }}</p>
    <div class="container">
      <md-ruler
        v-model="value"
        :scope="scope"
        :step="100"
        :unit="10"
        :scale-text-render="stepTextRender"
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
  methods: {
    stepTextRender(step) {
      return step + 'cm'
    },
  },
}
// #region ignore
export const metaInfo = {
  'zh-CN': {
    title: '自定义step展示文案',
  },
  'en-US': {
    title: 'Customize step text',
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
