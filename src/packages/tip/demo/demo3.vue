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

const showHandler = () => {
  console.log('Tip show')
}
const hideHandler = () => {
  Toast.info('hide click')
}
const showCoupon = () => {
  Toast.succeed('已领取优惠券！')
}
</script>

<template>
  <div
    class="
      md-example-child
      md-example-child-tip
      md-example-child-tip-3
    "
  >
    <md-tip
      name="md-tip-4"
      icon="security"
      :offset="{ top: -10, left: 0 }"
      fill
      :click-outside-hide="false"
      @show="showHandler"
      @hide="hideHandler"
    >
      <template #content>
        <div class="content">
          完善信息，领取5元
          <md-button :type="'link'" @click="showCoupon">
            免息券
          </md-button>
        </div>
      </template>
      <md-button>click me</md-button>
    </md-tip>
  </div>
</template>

<style lang="stylus">
.md-tip-content.md-tip-4
  color #C37447
  background-color #FFEBDF
  box-shadow none
  .content
    flex 1
    font-size 28px
  .tip-arrow
    border-width 10px 11px 0 11px
    border-color #FFEBDF transparent transparent transparent
</style>
