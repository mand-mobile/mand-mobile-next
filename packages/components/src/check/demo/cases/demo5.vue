<template>
  <div class="md-example-child md-example-child-check md-example-child-check-4">
    <md-field title="复选列表">
      <md-check-list
        v-model="favorites"
        iconPosition="left"
        :options="fruits"
      />
    </md-field>
  </div>
</template>

<script>
import Field from 'mand-mobile/lib/field'
import CheckList from 'mand-mobile/lib/check/list'

export default {
  components: {
    'md-field': Field,
    'md-check-list': CheckList,
  },
  data() {
    return {
      favorites: ['apple'],
      fruits: [
        {value: 'watermelon', label: '西瓜', brief: '选项摘要描述'},
        {value: 'apple', label: '苹果', brief: '选项摘要描述'},
        {value: 'banana', label: '香蕉', brief: '选项摘要描述'},
        {value: 'orange', label: '橙子', brief: '选项摘要描述'},
        {value: 'tomato', label: '西红柿', brief: '选项摘要描述', disabled: true},
      ],
    }
  },
}
// #region ignore
export const metaInfo = {
  'zh-CN': {
    title: '复选列表配置',
  },
  'en-US': {
    title: 'Check list configration',
  },
}
// #endregion ignore

</script>

<style scoped>
.md-example-child {
  font-size: 28px;
}
</style>
