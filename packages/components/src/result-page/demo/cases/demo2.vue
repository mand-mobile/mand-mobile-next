<template>
  <div class="md-example-child md-example-child-result-page md-example-child-result-page-2">
    <md-result-page :buttons="buttons" @customHandler="customHandler"></md-result-page>
  </div>
</template>

<script>import ResultPage from '../../index'
import Toast from '../../../toast/index.js'

export default {
  name: 'result-page-demo',
  /* DELETE */
  title: '按钮',
  titleEnUS: 'With button',
  /* DELETE */
  components: {
    'md-result-page': ResultPage,
  },
  data() {
    return {
      buttons: [
        {
          text: '普通按钮',

          handlerName: 'commonClick',
        },
        {
          text: '高亮按钮',
          type: 'primary',
          handlerName: 'highlightClick',
        },
      ],
    }
  },
  methods: {
    customHandler(name) {
      switch (name) {
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
</script>

<style lang="stylus">
.md-example-child-result-page-2 {
  background: #FFF;
}
</style>