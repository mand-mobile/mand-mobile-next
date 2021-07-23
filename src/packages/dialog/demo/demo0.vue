<script lang="ts">
export default {
  name: 'DialogDemo',
  title: '基本',
}
</script>
<script setup lang="ts">
import MdDialog from 'mand-mobile-next/dialog'
import MdButton from 'mand-mobile-next/button'
import { ref } from 'vue'
import Toast from 'mand-mobile-next/toast'

const show = ref(false)
const onBasicCancel = () => {
  Toast.info('你点击了取消')
}
const onBasicConfirm = () => {
  Toast.succeed('你点击了确认')
}

const show1 = ref(false)

const show5 = ref(false)

const actions = [
  {
    text: '取消',
    handler: onBasicCancel,
  },
  {
    text: '确认操作',
    handler: onBasicConfirm,
  },
]
</script>

<template>
  <div
    class="
      md-example-child
      md-example-child-dialog
      md-example-child-dialog-0
    "
  >
    <md-button @click="show = !show">基本</md-button>
    <md-dialog
      v-model="show"
      title="窗口标题"
      :closable="true"
      :actions="actions"
    >
      人生的刺，就在这里，留恋着不肯快走的，偏是你所不留恋的东西。
    </md-dialog>

    <md-button @click="show1 = !show1">带图标</md-button>
    <md-dialog
      v-model="show1"
      icon="location"
      :closable="true"
      :actions="actions"
    >
      人生的刺，就在这里，留恋着不肯快走的，偏是你所不留恋的东西。
    </md-dialog>

    <md-button @click="show5 = !show5">插槽</md-button>
    <md-dialog
      v-model="show5"
      title="家"
      :closable="true"
      :actions="actions"
    >
      <template #header>
        <div class="dialog-banner">
          <img
            src="http://img-hxy021.didistatic.com/static/strategymis/insurancePlatform_spu/uploads/27fb7f097ca218d743f816836bc7ea4a"
            alt=""
          />
        </div>
      </template>
      虽然其中有一些争吵、不愉快、曲折，但重要的是一家人整整齐齐。
    </md-dialog>
  </div>
</template>

<style lang="stylus">
.md-example-child-dialog-0
  .md-button
    margin-bottom 16px
.dialog-banner
  img
    display block
    width 100%
</style>
