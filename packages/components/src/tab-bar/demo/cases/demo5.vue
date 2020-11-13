<template>
  <div class="md-example-child md-example-child-tab-bar md-example-child-tab-bar-5">
    <md-tab-bar
      v-model="current"
      :items="items"
      @change="onChange"
    />
  </div>
</template>

<script>
import TabBar from 'mand-mobile/lib/tab-bar'
import Toast from 'mand-mobile/lib/toast'

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
  methods: {
    onChange(item, index, prevIndex) {
      Toast.info(`index: ${index}, prevIndex: ${prevIndex}, label: ${item.label}`)
    },
  },
}
// #region ignore
export const metaInfo = {
  'zh-CN': {
    title: '监听事件',
  },
  'en-US': {
    title: 'Evetns',
  },
}
// #endregion ignore

</script>
