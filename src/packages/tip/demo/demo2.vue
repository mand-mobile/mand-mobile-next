<script lang="ts">
export default {
  name: 'TipDemo',
  title: '左右',
}
</script>
<script setup lang="ts">
import MdTip from 'mand-mobile-next/tip'
import MdButton from 'mand-mobile-next/button'
import { ref } from 'vue'

const showHandler = () => {
  console.log('Tip show')
}
</script>

<template>
  <md-tip
    placement="left"
    content="left"
    @show="showHandler"
  >
    <md-button class="left-button" size="small" inline>
      click me
    </md-button>
  </md-tip>
  <md-tip
    placement="right"
    content="right"
    @show="showHandler"
  >
    <md-button class="left-button" size="small" inline>
      click me
    </md-button>
  </md-tip>
</template>

<style lang="stylus">
.left-button
  margin-left 18%
</style>
