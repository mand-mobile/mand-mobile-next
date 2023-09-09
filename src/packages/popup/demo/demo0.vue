<script lang="ts">
export default {
  name: 'PopupDemo',
  title: '基本',
}
</script>
<script setup lang="ts">
import { reactive } from 'vue'
import MdPopup from 'mand-mobile-next/popup'
import MdButton from 'mand-mobile-next/button'
import MdIcon from 'mand-mobile-next/icon'

const positions = reactive<
  Array<{
    type: 'center' | 'top' | 'bottom' | 'left' | 'right'
    desc: string
    show: boolean
    hasMask?: boolean
  }>
>([
  {
    type: 'center',
    desc: '中心弹出',
    show: false,
  },
  {
    type: 'bottom',
    desc: '底部弹出',
    show: false,
  },
  {
    type: 'top',
    desc: '顶部弹出',
    show: false,
    hasMask: false,
  },
  {
    type: 'left',
    desc: '左侧弹出',
    show: false,
  },
  {
    type: 'right',
    desc: '右侧弹出',
    show: false,
  },
])
</script>
<template>
  <md-button
    v-for="item in positions"
    :key="item.type"
    @click="item.show = true"
  >
    {{ item.desc }}
  </md-button>
  <md-popup
    v-for="(item, index) in positions"
    :key="index"
    v-model="item.show"
    :position="item.type"
    :has-mask="item.hasMask"
  >
    <div class="popup-content">
      {{ item.desc }}
      <md-icon
        v-if="item.hasMask === false"
        name="close"
        @click="item.show = false"
      ></md-icon>
    </div>
  </md-popup>
</template>

<style lang="stylus">
.md-button
  margin-bottom 12px
.md-popup-box
  box-shadow 0 0 4px 0px gainsboro
.popup-content
  padding 32px
  height 100%
  display flex
  justify-content space-between
  align-items center
  background-color #fff
  font-size 28px
</style>
