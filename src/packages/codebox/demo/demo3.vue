<script lang="ts">
export default {
  name: 'CodeboxDemo',
  title: '内联样式',
}
</script>
<script setup lang="ts">
import { ref } from 'vue'
import MdCodebox from 'mand-mobile-next/codebox'

const code = ref('')
</script>

<template>
  <MdCodebox
    v-model="code"
    class="inline-codebox"
    is-view
  />
</template>

<style lang="stylus">
.inline-codebox
  .md-codebox
    margin-bottom 32px
</style>
