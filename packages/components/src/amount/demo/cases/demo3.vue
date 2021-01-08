<template>
  <div class="md-example-child md-example-child-amount">
    <md-field>
      <md-input-item type="digit" v-model="num" maxlength="15"/>
      <md-amount :value="num" is-capital slot="header"></md-amount>
    </md-field>
	</div>
</template>

<script>
import Field from 'mand-mobile/lib/field'
import InputItem from 'mand-mobile/lib/input-item'
import Amount from 'mand-mobile/lib/amount'

export default {
  components: {
    'md-field': Field,
    'md-input-item': InputItem,
    'md-amount': Amount,
  },
  data() {
    return {
      num: 1234,
    }
  },
}
// #region ignore
export const metaInfo = {
  'zh-CN': {
    title: '大写中文',
  },
  'en-US': {
    title: 'Capital Chinese',
  },
}
// #endregion ignore

</script>

<style scoped>
.md-example-child-amount {
  text-align: center;
  font-size: 32px;
  color: #666;
}
</style>