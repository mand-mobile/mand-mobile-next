<template>
  <div class="md-example-child md-example-child-action-bar md-example-child-action-bar-0">
    <md-action-bar :actions="data"></md-action-bar>
  </div>
</template>

<script>
import {ActionBar, Toast} from 'mand-mobile'

export default {
  components: {
    'md-action-bar': ActionBar,
  },
  data() {
    return {
      data: [
        {
          text: '主要按钮',
          onClick: this.handleClick,
        },
      ],
    }
  },
  methods: {
    handleClick() {
      Toast.succeed('Click')
    },
  },
}

</script>
