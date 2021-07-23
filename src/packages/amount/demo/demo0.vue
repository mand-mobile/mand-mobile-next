<script lang="ts">
export default {
  name: 'AmountDemo',
  title: '基本',
}
</script>
<script setup lang="ts">
import MdAmount from 'mand-mobile-next/amount'
</script>

<template>
  <div class="md-example-child md-example-child-amount">
    <p>
      <span class="describe">Original</span>
      <md-amount
        :value="1234.125"
        :precision="3"
      ></md-amount>
    </p>
    <p>
      <span class="describe">Round</span>
      <md-amount :value="1234.125"></md-amount>
    </p>
    <p>
      <span class="describe">Floor</span>
      <md-amount :is-round-up="false">
        {{ 1234.123 }}
      </md-amount>
    </p>
    <p>
      <span class="describe">Currency unit</span>
      <md-amount :is-round-up="false">
        <template #unit>￥</template>{{ 1234.123 }}
      </md-amount>
      <!-- eslint-disable-next-line vue/no-parsing-error -->
      &nbsp
      <md-amount :is-round-up="false" unit="$" reverse>
        {{ 1234.123 }}
      </md-amount>
    </p>
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
