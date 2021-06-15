<script lang="ts">
export default {
  name: 'ActionSheetDemo',
  title: '基本',
}
</script>
<script setup lang="ts">
import { ref } from 'vue'
import MdActionSheet from 'mand-mobile/action-sheet'
import MdButton from 'mand-mobile/button'

const visible = ref(false)
const options = ref([
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
])
const val = ref('')
</script>

<template>
  <div
    class="md-example-child md-example-child-action-sheet"
  >
    <md-button @click="visible = !visible"
      >唤起动作面板</md-button
    >
    <md-action-sheet
      v-model="val"
      v-model:visible="visible"
      title="操作说明的标题"
      :invalid-index="2"
      cancel-text="cancel"
      :options="options"
    ></md-action-sheet>
  </div>
</template>
