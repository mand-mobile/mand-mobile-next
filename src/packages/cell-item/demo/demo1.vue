<script lang="ts">
export default {
  name: 'CellItemDemo',
  title: '插槽',
}
</script>
<script setup lang="ts">
import { ref } from 'vue'
import MdCellItem from 'mand-mobile-next/cell-item'
import MdSwitch from 'mand-mobile-next/switch'
import MdField from 'mand-mobile-next/field'

const open = ref(true)
</script>

<template>
  <div
    class="
      md-example-child
      md-example-child-cell-item
      md-example-child-cell-item-0
    "
  >
    <md-field>
      <md-cell-item
        title="余额"
        addon="可用8000.34"
        arrow
      />
      <md-cell-item title="余额" addon="可用8000.34" />
      <md-cell-item title="使用余额">
        <template #right>
          <md-switch v-model="open" />
        </template>
      </md-cell-item>
      <md-cell-item title="使用余额" disabled>
        <template #right>
          <md-switch :model-value="true" disabled />
        </template>
      </md-cell-item>
      <md-cell-item title="余额" addon="可用8000.34" arrow>
        <template #left>
          <div class="holder"></div>
        </template>
      </md-cell-item>
    </md-field>
  </div>
</template>

<style lang="stylus">
.holder
  display block
  width 88px
  height 88px
  border-radius 44px
  background-color #E6E6E6
</style>
