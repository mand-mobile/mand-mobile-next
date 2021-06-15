<script lang="ts">
export default {
  name: 'PopupDemo',
  title: '其他配置',
}
</script>
<script setup lang="ts">
import { reactive } from 'vue'
import MdPopup from 'mand-mobile/popup'
import MdPopupTitleBar from 'mand-mobile/popup-title-bar'
import MdButton from 'mand-mobile/button'

const configs = reactive<
  Array<{
    type: 'center' | 'top' | 'bottom' | 'left' | 'right'
    desc: string
    show: boolean
    hasMask?: boolean
  }>
>([
  {
    type: 'bottom',
    desc: '标题居左',
    show: false,
  },
])
</script>

<template>
  <md-button
    v-for="item in configs"
    :key="item.type"
    @click="item.show = true"
  >
    {{ item.desc }}
  </md-button>
  <md-popup
    v-for="(item, index) in configs"
    :key="index"
    v-model="item.show"
    :position="item.type"
  >
    <md-popup-title-bar
      only-close
      title="标题"
      describe="title & description align left"
      title-align="left"
      @cancel="item.show = false"
    ></md-popup-title-bar>
    <div class="popup-content-1">
      666
      <br />
      666
      <br />
      666
      <br />
    </div>
  </md-popup>
</template>

<style lang="stylus">
.popup-content-1
  padding 40px
  height auto
  display flex
  justify-content space-between
  align-items center
  background-color #fff
  font-size 28px
</style>
