<template>
  <div class="md-example-child md-example-child-result-page md-example-child-result-page-2">
    <md-result-page :buttons="buttons" @customHandler="customHandler"></md-result-page>
  </div>
</template>

<script>
import ResultPage from 'mand-mobile/result-page'

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

          handlerName: 'commonClick'
        },
        {
          text: '高亮按钮',
          type: 'primary',
          handlerName: 'highlightClick'
        },
      ],
    }
  },
  methods: {
    customHandler(name) {
      switch (name) {
        case 'commonClick':
          uni.showToast({title: '普通操作'})
          break;
        case 'highlightClick':
          uni.showToast({title: '高亮按钮操作'})
        default:
          break;
      }
    }
  }
}

</script>

<style lang="stylus">
.md-example-child-result-page-2
  background #FFF
</style>