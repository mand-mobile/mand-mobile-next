<script lang="ts">
export default {
  name: 'InputItemDemo',
  title: '基本',
}
</script>

<script setup lang="ts">
import MdInputItem from 'mand-mobile-next/input-item'
import MdField from 'mand-mobile-next/field'
</script>

<template>
  <div
    class="md-example-child md-example-child-input-item-0"
  >
    <md-field>
      <md-input-item
        title="普通文本"
        placeholder="普通文本"
        :maxlength="5"
      ></md-input-item>
      <md-input-item
        title="禁用表单"
        model-value="禁用表单"
        disabled
      ></md-input-item>
      <md-input-item
        title="只读表单"
        model-value="只读表单"
        readonly
      ></md-input-item>
      <md-input-item
        title="高亮表单"
        placeholder="高亮表单"
        is-highlight
      ></md-input-item>
      <md-input-item
        title="文本居中"
        placeholder="文本居中"
        align="center"
      ></md-input-item>
      <md-input-item
        title="文本居右"
        placeholder="文本居右"
        align="right"
      ></md-input-item>
    </md-field>
  </div>
</template>
