<script lang="ts">
export default {
  name: 'SelectorDemo',
  title: '基本',
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
  {
    value: '6',
    text: '选项六',
  },
  {
    value: '7',
    text: '选项七',
  },
  {
    value: '8',
    text: '选项八',
  },
  {
    value: '9',
    text: '选项九',
  },
  {
    value: '10',
    text: '选项十',
  },
])

const isSelectorShow = ref(false)
const showSelector = () => (isSelectorShow.value = true)

const selectorValue = ref('3')
const onSelectorChoose = (item: any) => {
  console.log(item)
}
const onHide = () => {
  console.log('hide')
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
        title="普通模式"
        :content="selectorValue"
        arrow
        solid
        @click="showSelector"
      />
    </md-field>
    <md-selector
      v-model="selectorValue"
      v-model:visible="isSelectorShow"
      :data="data"
      max-height="320px"
      title="普通模式"
      @select="onSelectorChoose"
      @hide="onHide"
    ></md-selector>
  </div>
</template>
