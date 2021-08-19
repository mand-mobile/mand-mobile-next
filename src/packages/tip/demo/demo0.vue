<script lang="ts">
export default {
  name: 'TipDemo',
  title: '上方',
}
</script>
<script setup lang="ts">
import MdTip from 'mand-mobile-next/tip'
import MdButton from 'mand-mobile-next/button'
import { ref } from 'vue'

const showHandler = () => {
  console.log('Tip show')
}
const show = ref(false)
</script>

<template>
  <div
    class="
      md-example-child
      md-example-child-tip
      md-example-child-tip-0
    "
  >
    <md-tip
      placement="top"
      content="top"
      @show="showHandler"
    >
      <md-button>click me</md-button>
    </md-tip>
  </div>
</template>
