<template>
  <div class="md-example-child md-example-child-input-item-3">
    <md-field title="转出金额(元)">
      <div
        class="field-operator"
        slot="action"
        @click="onClick"
      >
        <md-icon name="info"></md-icon>
      </div>
      <md-input-item
        type="money"
        v-model="value"
        brief="理财提示文案，字符超出10个自动变小"
        placeholder="最多30万元"
        :size="size"
        is-amount
        is-highlight
      >
        <div class="input-operator" slot="right" @click="takeAll">全部取出</div>
      </md-input-item>
    </md-field>
  </div>
</template>

<script>
import Toast from 'mand-mobile/lib/toast'
import InputItem from 'mand-mobile/lib/input-item'
import Field from 'mand-mobile/lib/field'
import Icon from 'mand-mobile/lib/icon'

export default {
  name: 'input-item-demo',
  components: {
    'md-input-item': InputItem,
    'md-field': Field,
    'md-icon': Icon,
  },
  data() {
    return {
      value: '',
    }
  },
  computed: {
    size() {
      return this.value.length > 10 ? 'small' : 'large'
    },
  },
  methods: {
    takeAll() {
      this.value = '300000'
    },
    onClick() {
      Toast.create({
        content: 'some information',
        icon: 'warn',
      })
    },
  },
}
// #region ignore
export const metaInfo = {
  'zh-CN': {
    title: '大尺寸金融表单',
  },
  'en-US': {
    title: 'Large size',
  },
}
// #endregion ignore

</script>

<style lang="stylus">
.md-example-child-input-item-3
  .md-field
    padding-bottom 20px
    .md-field-title
      .value
        display flex
        align-items center
        justify-content flex-end
        .field-operator
          display flex
          align-items center
    .md-field-item-content::before
      background-color #C5CAD5
    .input-operator
      font-size 28px
      color #5878B4
</style>
