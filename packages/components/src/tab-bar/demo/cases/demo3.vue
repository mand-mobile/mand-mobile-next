<template>
  <div class="md-example-child md-example-child-tab-bar md-example-child-tab-bar-3">
    <md-tab-bar
      v-model="current"
      :items="items"
      :hasInk="false"
      has-divide
    />
  </div>
</template>

<script>
import TabBar from 'mand-mobile/lib/tab-bar'

export default {
  components: {
    'md-tab-bar': TabBar,
  },
  data() {
    return {
      current: 1,
      items: [{name: 1, label: '标签1'}, {name: 2, label: '标签2'}, {name: 3, label: '标签3'}],
    }
  },
}
// #region ignore
export const metaInfo = {
  'zh-CN': {
    title: '无下划线',
  },
  'en-US': {
    title: 'No ink',
  },
}
// #endregion ignore

</script>
