<template>
  <div class="md-example-child md-example-child-tabs md-example-child-tab-bar-0">
    <md-tab-bar
      v-model="current"
      :items="items"
    />
  </div>
</template>

<script>
import TabBar from 'mand-mobile/tab-bar'

export default {
  name: 'tab-bar-demo',
  components: {
    'md-tab-bar': TabBar,
  },
  data() {
    return {
      current: 1,
      items: [{name: 1, label: '标签1'}, {name: 2, label: '标签2'}],
    }
  },
}

</script>
