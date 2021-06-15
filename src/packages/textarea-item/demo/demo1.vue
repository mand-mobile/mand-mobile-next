<script lang="ts">
export default {
  name: 'TextareaItemDemo',
  title: '错误提示',
  titleEnUS: 'Error tips',
}
</script>
<script setup lang="ts">
import MdTextareaItem from 'mand-mobile/textarea-item'
import MdField from 'mand-mobile/field'
import { ref } from 'vue'
import type { Ref } from 'vue'

const value = ref('申请理赔xxx')
const blur = () => {
  console.log('blur')
}
const keyup = (e: Event) => {
  console.log('keyup', e)
}
const focus = () => {
  console.log('focus')
}
const keydown = (e: Event) => {
  console.log('keydown', e)
}
const change = (v: Ref<string>) => {
  console.log('change', v)
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
        ref="demo1"
        v-model="value"
        title="错误提示"
        class="example"
        placeholder=""
        error="输入信息有误!"
        @blur="blur"
        @change="change"
        @keyup="keyup"
        @keydown="keydown"
        @focus="focus"
      />
    </md-field>
  </div>
</template>
