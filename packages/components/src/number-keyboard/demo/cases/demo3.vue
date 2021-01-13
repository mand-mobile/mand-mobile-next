<template>
  <div class="md-example-child md-example-child-number-keyboard md-example-child-number-keyboard-3">
    <md-button @click="isKeyBoardShow = !isKeyBoardShow">{{ isKeyBoardShow ? '收起键盘' : '唤起键盘' }}</md-button>
    <md-number-keyboard
      v-model="isKeyBoardShow"
      ok-text="支付"
      disorder
    >
      <p class="number-keyboard-header">
        <md-icon name="security" size="sm"></md-icon>&nbsp;Mand Mobile 安全支付键盘
      </p>
    </md-number-keyboard>
  </div>
</template>

<script>
import Button from 'mand-mobile/lib/button'
import Icon from 'mand-mobile/lib/icon'
import NumberKeyboard from 'mand-mobile/lib/number-keyboard'

export default {
  components: {
    'md-button': Button,
    'md-number-keyboard': NumberKeyboard,
    'md-icon': Icon,
  },
  data() {
    return {
      isKeyBoardShow: false,
    }
  },
}
// #region ignore
export const metaInfo = {
  'zh-CN': {
    title: '插槽',
  },
  'en-US': {
    title: 'Slots',
  },
}
// #endregion ignore

</script>

<style lang="stylus" scoped>
.number-keyboard-header
  display flex
  align-items center
  justify-content center
  padding 15px 0
  font-size 24px
  color #FF7D41
</style>
