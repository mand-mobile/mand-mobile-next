<script lang="ts">
export default {
  name: 'AmountDemo',
  title: '变化动效',
}
</script>
<script setup lang="ts">
import MdAmount from 'mand-mobile/amount'
import { ref } from 'vue'

const val = ref(1000)

setTimeout(() => {
  val.value = 1500
  setTimeout(() => {
    val.value = 500
  }, 2000)
}, 2000)
</script>

<template>
  <div class="md-example-child md-example-child-amount">
    <!-- animation number cannot use default slot -->
    <md-amount
      :value="val"
      :duration="800"
      transition
    ></md-amount>
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
