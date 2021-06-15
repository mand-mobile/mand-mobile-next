<script lang="ts">
export default {
  name: 'AmountDemo',
  title: '千位分隔符',
}
</script>
<script setup lang="ts">
import MdAmount from 'mand-mobile/amount'
</script>

<template>
  <div class="md-example-child md-example-child-amount">
    <md-amount :value="1234" has-separator></md-amount>
    <br />
    <md-amount :precision="3" has-separator>
      {{ -123456.123 }}
    </md-amount>
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
