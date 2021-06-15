<script lang="ts">
export default {
  name: 'TipDemo',
  title: '上方',
}
</script>
<script setup lang="ts">
import MdTip from 'mand-mobile/tip'
import MdButton from 'mand-mobile/button'
import { ref } from 'vue'

const showHandler = () => {
  console.log('Tip show')
}
const show = ref(false)
</script>

<template>
  <md-tip placement="top" content="top" @show="showHandler">
    <md-button>click me</md-button>
  </md-tip>
</template>
