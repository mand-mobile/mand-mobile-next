<script lang="ts">
export default {
  name: 'CodeboxDemo',
  title: '系统键盘',
}
</script>
<script setup lang="ts">
import { ref } from 'vue'
import MdCodebox from 'mand-mobile/codebox'

const code = ref('')
</script>

<template>
  <MdCodebox v-model="code" :maxlength="5" system />
</template>
