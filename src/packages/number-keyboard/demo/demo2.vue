<script lang="ts">
export default {
  name: 'NumberKeyboardDemo',
  title: '替换键值',
}
</script>
<script setup lang="ts">
import MdNumberKeyboard from 'mand-mobile-next/number-keyboard'
import MdButton from 'mand-mobile-next/button'
import Toast from 'mand-mobile-next/toast'
import { ref } from 'vue'

const showPopup = ref(false)

function onEnter(val: any) {
  Toast.info(`输入: ${val}`)
}

function onDelete() {
  Toast.info(`删除键`)
}

function keyFormatter(val: number | string) {
  if (val === '.') {
    return 'x'
  }
}
</script>

<template>
  <div>
    <md-button @click="showPopup = !showPopup">{{
      showPopup ? '收起键盘' : '唤起键盘'
    }}</md-button>
    <md-number-keyboard
      v-model:visible="showPopup"
      :type="'professional'"
      :text-render="keyFormatter"
      @enter="onEnter"
      @delete="onDelete"
    ></md-number-keyboard>
  </div>
</template>
