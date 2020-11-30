<template>
  <div class="md-example-child md-example-child-input-item-4">
    <md-field>
      <md-input-item
        ref="input9"
        title="清空按钮"
        placeholder="normal text"
        clearable
      ></md-input-item>

      <md-input-item
        ref="input10"
        title="金融键盘"
        placeholder="financial number keyboard"
        is-virtual-keyboard
        clearable
        @focus="onFakeInputFocus"
        @blur="onFakeInputBlur"
      ></md-input-item>

      <md-input-item
        ref="input11"
        title="自定义键盘"
        placeholder="custom number keyboard"
        is-virtual-keyboard
        virtual-keyboard-vm="myNumberKeyBoard"
        clearable
      ></md-input-item>
      <md-number-keyboard type="simple" ref="myNumberKeyBoard"></md-number-keyboard>

      <md-input-item
        ref="input11"
        placeholder="left/right slots"
      >
        <md-icon name="id-card" slot="left"></md-icon>
        <md-icon name="info" slot="right" @click.native="onClick"></md-icon>
      </md-input-item>
    </md-field>
  </div>
</template>

<script>
import Toast from 'mand-mobile/lib/toast'
import InputItem from 'mand-mobile/lib/input-item'
import Field from 'mand-mobile/lib/field'
import Icon from 'mand-mobile/lib/icon'
import NumberKeyboard from 'mand-mobile/lib/number-keyboard'
import '../assets/bank-zs.svg'

export default {
  components: {
    'md-input-item': InputItem,
    'md-number-keyboard': NumberKeyboard,
    'md-field': Field,
    'md-icon': Icon,
  },
  methods: {
    onClick() {
      Toast.create({
        content: 'some information',
        icon: 'warn',
      })
    },
    onFakeInputBlur() {
      // eslint-disable-next-line no-unused-expressions
      this.scrollInputBack && this.scrollInputBack()
    },
  },
}
// #region ignore
export const metaInfo = {
  'zh-CN': {
    title: '表单控件',
  },
  'en-US': {
    title: 'Input with controls',
  },
}
// #endregion ignore

</script>

<style lang="stylus">
.md-example-child-input-item-4
  .md-number-keyboard .md-popup-box
    max-width 720px
</style>
