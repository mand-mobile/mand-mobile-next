<template>
  <div class="md-example-child md-example-child-amount">
    <md-amount :value="1234" is-capital></md-amount>
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
  font-weight: 300;
  text-align: center;
  font-size: 32px;
  color: #666;
}
</style>