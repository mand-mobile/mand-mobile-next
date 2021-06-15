<script lang="ts">
export default {
  name: 'AmountDemo',
  title: '大写中文',
}
</script>
<script setup lang="ts">
import MdAmount from 'mand-mobile/amount'
</script>

<template>
  <div class="md-example-child md-example-child-amount">
    <md-amount :value="1234" is-capital></md-amount>
    <br />
    <md-amount :value="1234.1118" is-capital></md-amount>
    <br />
    <md-amount is-capital>1234.101</md-amount>
  </div>
</template>

<style lang="stylus" scoped>
.md-example-child-amount
  text-align center
  color #666
  p
    font-size 50px
    span.describe
      font-size 18px
</style>
