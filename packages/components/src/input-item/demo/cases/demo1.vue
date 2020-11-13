<template>
  <div class="md-example-child md-example-child-input-item-1">
    <md-field>
      <md-input-item
        ref="name"
        preview-type="text"
        value="张**"
        title="真实姓名"
        placeholder="投保人姓名"
        isTitleLatent
      ></md-input-item>
      <md-input-item
        ref="id"
        type="bankCard"
        preview-type="text"
        value="6222 **** **** 1234"
        title="银行卡号"
        placeholder="投保人银行卡号"
        is-virtual-keyboard
        isTitleLatent
        ></md-input-item>
    </md-field>
  </div>
</template>

<script>
import InputItem from 'mand-mobile/lib/input-item'
import Field from 'mand-mobile/lib/field'

export default {
  components: {
    'md-input-item': InputItem,
    'md-field': Field,
  },
}
// #region ignore
export const metaInfo = {
  'zh-CN': {
    title: '标题浮动输入框',
  },
  'en-US': {
    title: 'Floating title',
  },
}
// #endregion ignore

</script>
