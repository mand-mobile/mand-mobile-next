<script lang="ts">
export default {
  name: 'NumberKeyboardDemo',
  title: '隐藏小数点',
}
</script>
<script setup lang="ts">
import MdNumberKeyboard from 'mand-mobile-next/number-keyboard'
</script>

<template>
  <md-number-keyboard
    :is-view="true"
    :hide-dot="true"
  ></md-number-keyboard>
</template>
