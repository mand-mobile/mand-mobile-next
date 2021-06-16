<script lang="ts">
export default {
  name: 'SelectorDemo',
  title: '多选模式',
}
</script>
<script setup lang="ts">
import { ref } from 'vue'
import MdSelector from 'mand-mobile/selector'
import MdField from 'mand-mobile/field'
import MdFieldItem from 'mand-mobile/field-item'

const data = ref([
  {
    value: '1',
    text: '选项一',
  },
  {
    value: '2',
    text: '选项二',
  },
  {
    value: '3',
    text: '选项三',
  },
  {
    value: '4',
    text: '选项四',
  },
  {
    value: '5',
    text: '选项五',
  },
])

const isSelectorShow = ref(false)
const showSelector = () => (isSelectorShow.value = true)

const selectorValue = ref(['3'])
const onSelectorChoose = (item: any) => {
  console.log(item)
}
const onHide = () => {
  console.log('hide')
}
const onSelectorConfirm = () => {
  console.log('confirm')
}
</script>

<template>
  <div
    class="
      md-example-child
      md-example-child-selector
      md-example-child-selector-0
    "
  >
    <md-field>
      <md-field-item
        title="多选模式"
        :content="selectorValue.toString()"
        arrow
        solid
        @click="showSelector"
      />
    </md-field>
    <md-selector
      v-model="selectorValue"
      v-model:visible="isSelectorShow"
      :data="data"
      title="多选模式"
      ok-text="确认"
      cancel-text="取消"
      @confirm="onSelectorConfirm"
      @select="onSelectorChoose"
      @hide="onHide"
    ></md-selector>
  </div>
</template>
