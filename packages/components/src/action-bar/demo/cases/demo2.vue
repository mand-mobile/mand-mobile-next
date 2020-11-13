<template>
  <div class="md-example-child md-example-child-action-bar md-example-child-action-bar-2">
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
          disabled: true,
        },
        {
          text: '主要按钮',
          disabled: true,
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
    title: '按钮禁用',
  },
  'en-US': {
    title: 'Multiple buttons and disabled button',
  },
}
// #endregion ignore

</script>
