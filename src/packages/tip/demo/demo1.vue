<script lang="ts">
export default {
  name: 'TipDemo',
  title: '下方',
}
</script>
<script setup lang="ts">
import MdTip from 'mand-mobile-next/tip'
import MdButton from 'mand-mobile-next/button'
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
  <div
    class="
      md-example-child
      md-example-child-tip
      md-example-child-tip-1
    "
  >
    <md-tip
      placement="bottom"
      content="bottom"
      @show="showHandler"
    >
      <md-button @click="clickHandler">click me</md-button>
    </md-tip>
  </div>
</template>
