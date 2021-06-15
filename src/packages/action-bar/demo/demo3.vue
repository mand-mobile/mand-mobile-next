<script lang="ts">
export default {
  name: 'ActionBarDemo',
  title: '基本',
}
</script>
<script setup lang="ts">
import { reactive } from 'vue'
import MdActionBar from 'mand-mobile/action-bar'

const data = reactive([
  {
    text: '主要按钮',
    round: true,
    onClick: (ev: Event, action: any) => {
      console.log('action', ev, action)
    },
  },
])
</script>

<template>
  <div
    class="
      md-example-child
      md-example-child-action-bar
      md-example-child-0
    "
  >
    <md-action-bar :actions="data">
      <span class="price">
        &yen;128.00<small>起</small>
      </span>
    </md-action-bar>
  </div>
</template>

<style lang="stylus">
.price
  font-weight 500
  font-size 48px
  color #FF823A
  small
    margin-left 10px
    font-size 32px
    color #858B9C
</style>
