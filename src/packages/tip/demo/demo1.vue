<script lang="ts">
export default {
  name: 'TipDemo',
  title: '下方',
}
</script>
<script setup lang="ts">
import MdTip from 'mand-mobile/tip'
import MdButton from 'mand-mobile/button'
import { ref } from 'vue'

const showHandler = () => {
  console.log('Tip show')
}
const clickHandler = () => {
  console.log('bottom')
}
const show = ref(false)
</script>

<template>
  <md-tip
    placement="bottom"
    content="bottom"
    @show="showHandler"
  >
    <md-button @click="clickHandler">click me</md-button>
  </md-tip>
</template>
