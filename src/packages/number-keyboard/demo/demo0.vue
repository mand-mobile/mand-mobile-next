<script lang="ts">
export default {
  name: 'NumberKeyboardDemo',
  title: '弹窗展示(professional)',
}
</script>
<script setup lang="ts">
import MdNumberKeyboard from 'mand-mobile/number-keyboard'
import MdButton from 'mand-mobile/button'
import Toast from 'mand-mobile/toast'
import { ref } from 'vue'

const showPopup = ref(false)

function onEnter(val: any) {
  Toast.info(`输入: ${val}`)
}

function onDelete() {
  Toast.info(`删除键`)
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
      @enter="onEnter"
      @delete="onDelete"
    ></md-number-keyboard>
  </div>
</template>
