<script lang="ts">
export default {
  name: 'TextareaItemDemo',
  title: '普通文本域',
}
</script>
<script setup lang="ts">
import MdTextareaItem from 'mand-mobile/textarea-item'
import MdField from 'mand-mobile/field'
import { ref } from 'vue'

const value = ref('')
const value2 = ref('')
const value3 = ref('')

setTimeout(() => {
  value2.value =
    '异步数据,高度适应,异步数据,高度适应,异步数据,高度适应,异步数据,高度适应,异步数据,高度适应,异步数据,高度适应'
}, 1000)

const format = (curValue: string) => {
  return {
    value: curValue.replace(/\d/g, ''),
  }
}
</script>

<template>
  <div
    class="
      md-example-child
      md-example-child-textarea
      md-example-child-textarea-0
    "
  >
    <md-field>
      <md-textarea-item
        v-model="value"
        title="普通"
        autosize
        class="example"
        placeholder="普通文本域"
      />
      <md-textarea-item
        v-model="value2"
        title="自动适应"
        class="example"
        :autosize="true"
        :rows="1"
        placeholder="最大高度150px"
        :max-height="150"
      />
      <md-textarea-item
        title="删除图标"
        class="example"
        :autosize="true"
        clearable
        :rows="1"
        placeholder="输入出现删除图标"
        :max-height="150"
      />
      <md-textarea-item
        title="禁用"
        class="example"
        :autosize="true"
        model-value="禁用文本域, 理赔报案描述, 理赔报案描述, 理赔报案描述, 理赔报案描述, 理赔报案描述, 理赔报案描述"
        placeholder="500字以内"
        :max-height="150"
        disabled
      />
      <md-textarea-item
        title="只读"
        class="example"
        :autosize="true"
        model-value="只读文本域, 理赔报案描述, 理赔报案描述, 理赔报案描述, 理赔报案描述, 理赔报案描述, 理赔报案描述"
        placeholder="500字以内"
        :max-height="150"
        readonly
      />
      <md-textarea-item
        v-model="value3"
        title="格式化"
        autosize
        class="example"
        :formation="format"
        placeholder="去掉所有数字"
      />
    </md-field>
  </div>
</template>
