<script lang="ts">
export default {
  name: 'CashierDemo',
  title: '基本',
}
</script>
<script setup lang="ts">
import MdCashier from 'mand-mobile/cashier'
import MdButton from 'mand-mobile/button'
import { ref } from 'vue'

const show = ref(false)
</script>

<template>
  <md-button @click="show = !show">唤起收银台</md-button>
  <MdCashier v-model:visible="show" />
</template>
