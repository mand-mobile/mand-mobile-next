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
</script>

<template>
  <div
    class="md-example-child md-example-child-input-item-1"
  >
    <md-field>
      <md-input-item
        preview-type="text"
        model-value="张**"
        title="真实姓名"
        placeholder="投保人姓名"
        is-title-latent
      ></md-input-item>
      <md-input-item
        type="bankCard"
        preview-type="text"
        model-value="6222 **** **** 1234"
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
