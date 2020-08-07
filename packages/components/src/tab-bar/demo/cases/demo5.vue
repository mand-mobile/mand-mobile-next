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
// import {TabBar, Toast} from 'mand-mobile'

export default {
  name: 'tab-bar-demo',
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

</script>
