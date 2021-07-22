<script lang="ts">
export default {
  name: 'InputItemDemo',
  /* DELETE */
  title: '标题浮动输入框',
  titleEnUS: 'Floating title input',
}
</script>
<script setup lang="ts">
import MdInputItem from 'mand-mobile/input-item'
import MdField from 'mand-mobile/field'
import { ref } from 'vue'

const card = ref('6222 **** **** 1234')
const name = ref('张**')
</script>

<template>
  <div
    class="md-example-child md-example-child-input-item-1"
  >
    <md-field>
      <md-input-item
        v-model="name"
        preview-type="text"
        title="真实姓名"
        placeholder="投保人姓名"
        is-title-latent
      ></md-input-item>
      <md-input-item
        v-model="card"
        type="bankCard"
        preview-type="text"
        title="银行卡号"
        placeholder="投保人银行卡号"
        is-title-latent
        is-virtual-keyboard
      ></md-input-item>
    </md-field>
  </div>
</template>

<style lang="stylus">
.md-example-child-input-item-1
  .md-field
    padding-bottom 40px
</style>
