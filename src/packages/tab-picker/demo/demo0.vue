<script lang="ts">
export default {
  name: 'TabPickerDemo',
  title: '基本',
}
</script>
<script setup lang="ts">
import { ref } from 'vue'
import MdField from 'mand-mobile/field'
import MdFieldItem from 'mand-mobile/field-item'
import MdTabPicker from 'mand-mobile/tab-picker'
import data from './data.json'

const show = ref(false)
const selects = ref([])
</script>

<template>
  <div
    class="
      md-example-child
      md-example-child-tab-picker
      md-example-child-tab-picker-0
    "
  >
    <md-field title="地址">
      <md-field-item
        title="联系地址"
        arrow="arrow-right"
        placeholder="请选择联系地址"
        solid
        :content="selects.toString()"
        @click="show = !show"
      />
    </md-field>
    <md-tab-picker
      v-model="selects"
      v-model:visible="show"
      title="请选择"
      describe="请选择您所在的省份、城市、区县"
      :data="data"
    />
  </div>
</template>
