<template>
  <div class="md-example-child md-example-child-result-page md-example-child-result-page-2">
    <md-result-page :buttons="buttons" @action="customHandler"></md-result-page>
  </div>
</template>

<script>
import ResultPage from 'mand-mobile/lib/result-page'
import Toast from 'mand-mobile/lib/toast'

export default {
  components: {
    'md-result-page': ResultPage,
  },
  data() {
    return {
      buttons: [
        {
          text: '普通按钮',
          name: 'commonClick',
        },
        {
          text: '高亮按钮',
          type: 'primary',
          name: 'highlightClick',
        },
      ],
    }
  },
  methods: {
    customHandler(button) {
      switch (button.name) {
        case 'commonClick':
          Toast.info('普通操作')
          break
        case 'highlightClick':
          Toast.info('高亮按钮操作')
          break
        default:
          break
      }
    },
  },
}
// #region ignore
export const metaInfo = {
  'zh-CN': {
    title: '操作按钮',
  },
  'en-US': {
    title: 'Action buttons',
  },
}
// #endregion ignore

</script>

<style>
.md-example-child-result-page-2 {
  padding: 40px 0;
  background: #FFF;
}
</style>