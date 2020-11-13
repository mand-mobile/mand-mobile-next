<template>
  <div class="md-example-child md-example-child-action-bar md-example-child-action-bar-1">
    <md-action-bar :actions="data"></md-action-bar>
  </div>
</template>

<script>
import ActionBar from 'mand-mobile/lib/action-bar'
import Toast from 'mand-mobile/lib/toast'

export default {
  components: {
    'md-action-bar': ActionBar,
  },
  data() {
    return {
      data: [
        {
          text: '次要按钮',
          onClick: this.handleClick,
        },
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
// #region ignore
export const metaInfo = {
  'zh-CN': {
    title: '多按钮',
  },
  'en-US': {
    title: 'Multiple buttons',
  },
}
// #endregion ignore

</script>
