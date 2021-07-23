<script lang="ts">
export default {
  name: 'ActionSheetDemo',
  title: '单例模式',
}
</script>
<script setup lang="ts">
import { ref } from 'vue'
import MdActionSheet from 'mand-mobile-next/action-sheet'
import MdButton from 'mand-mobile-next/button'

const val = ref<number | string>('')
const clickHandler = () => {
  const vm = MdActionSheet.create<{
    label: string
    value: number | string
  }>({
    title: '操作说明的标题',
    options: [
      {
        label: '选项1',
        value: 0,
      },
      {
        label: '选项2',
        value: 1,
      },
      {
        label: '选项3',
        value: 2,
      },
    ],
    modelValue: val.value,
    invalidIndex: 2,
    cancelText: '取消',
    onCancel: () => {
      vm?.updateProps?.({ visible: false })
    },
    onSelect: (item) => {
      console.log('click', item)
      val.value = item.value
      vm?.updateProps?.({
        visible: false,
        modelValue: val.value,
      })
    },
    onHide: () => {
      console.log('hide')
      vm?.remove?.()
    },
    onMaskClick: () => {
      vm?.updateProps?.({ visible: false })
    },
  })
}
</script>

<template>
  <div
    class="md-example-child md-example-child-action-sheet"
  >
    <md-button @click="clickHandler"
      >唤起动作面板</md-button
    >
  </div>
</template>
