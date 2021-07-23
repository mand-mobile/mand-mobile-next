<script lang="ts">
export default {
  name: 'CodeboxDemo',
  title: '基本',
}
</script>
<script setup lang="ts">
import { ref } from 'vue'
import MdCodebox from 'mand-mobile-next/codebox'

const code = ref('')
</script>

<template>
  <MdCodebox v-model="code" autofocus />
</template>
