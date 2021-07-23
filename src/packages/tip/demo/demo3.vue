<script lang="ts">
export default {
  name: 'TipDemo',
  title: '复杂配置',
}
</script>
<script setup lang="ts">
import MdTip from 'mand-mobile-next/tip'
import MdButton from 'mand-mobile-next/button'
import Toast from 'mand-mobile-next/toast'
import { ref } from 'vue'

const showHandler = () => {
  console.log('Tip show')
}
const hideHandler = () => {
  Toast.info('hide click')
}
</script>

<template>
  <md-tip
    name="md-tip-4"
    icon="security"
    content="完善信息，领取5元免息券"
    :offset="{ top: -10, left: 0 }"
    fill
    :click-outside-hide="false"
    @show="showHandler"
    @hide="hideHandler"
  >
    <md-button>click me</md-button>
  </md-tip>
</template>

<style lang="stylus">
.md-tip-content.md-tip-4
  color #C37447
  background-color #FFEBDF
  box-shadow none
  .tip-arrow
    border-width 10px 11px 0 11px
    border-color #FFEBDF transparent transparent transparent
</style>
