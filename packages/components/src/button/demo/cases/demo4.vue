<template>
  <div class="md-example-child  md-example-child-button md-example-child-button-3">
    <md-button type="link" icon="message">评论</md-button>
    <md-button type="link" inactive>
      去看看<md-icon name="arrow-right" size="md"></md-icon>
    </md-button>
  </div>
</template>

<script>
import Button from 'mand-mobile/lib/button'
import Icon from 'mand-mobile/lib/icon'

export default {
  components: {
    'md-button': Button,
    'md-icon': Icon,
  },
}
// #region ignore
export const metaInfo = {
  title: '文字链接按钮',
  align: 'right',
}
// #endregion ignore

</script>
