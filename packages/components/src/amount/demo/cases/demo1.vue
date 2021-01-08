<template>
  <div class="md-example-child md-example-child-amount">
    <md-amount :value="1234" has-separator></md-amount>
    <br>
    <md-amount :value="-123456.123" :precision="3" has-separator></md-amount>
	</div>
</template>

<script>
import Amount from 'mand-mobile/lib/amount'

export default {
  components: {
    'md-amount': Amount,
  },
}
// #region ignore
export const metaInfo = {
  'zh-CN': {
    title: '千位分隔符',
  },
  'en-US': {
    title: 'Thousands Separator',
  },
}
// #endregion ignore

</script>

<style scoped>
.md-example-child-amount {
  display: flex;
  flex-direction: column;
  align-items: center;
  font-size: 48px;
}
</style>