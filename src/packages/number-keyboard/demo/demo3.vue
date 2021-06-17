<script lang="ts">
export default {
  name: 'NumberKeyboardDemo',
  title: '乱序',
}
</script>
<script setup lang="ts">
import MdNumberKeyboard from 'mand-mobile/number-keyboard'
import { ref } from 'vue'

const disorder = ref(true)
</script>

<template>
  <md-number-keyboard
    :is-view="true"
    :disorder="disorder"
  ></md-number-keyboard>
</template>
