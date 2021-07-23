<script setup lang="ts">
import { ref } from 'vue'
import { useCssVar } from 'mand-mobile-next/composable'

const theme = ref ({
  'color-primary': '#4280EB'
})

useCssVar(theme)
</script>
<template>
  <input v-model="theme['color-primary']" type="color" class="color-picker" />
</template>

<style lang="stylus">
.color-picker
  padding 0
  width 20px
  height 24px
  border none
  outline none
  background transparent
  cursor pointer
</style>