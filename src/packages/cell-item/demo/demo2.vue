<script lang="ts">
export default {
  name: 'CellItemDemo',
  title: '多行列表',
}
</script>
<script setup lang="ts">
import { ref } from 'vue'
import MdCellItem from 'mand-mobile-next/cell-item'
import MdSwitch from 'mand-mobile-next/switch'
import MdField from 'mand-mobile-next/field'

const open = ref(false)
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
        title="交通银行(尾号3089)"
        brief="展示摘要描述"
      />
      <md-cell-item
        title="招商银行(尾号2342)"
        brief="展示摘要描述"
      >
        <template #right>
          <md-switch v-model="open" />
        </template>
      </md-cell-item>
      <md-cell-item
        title="交通银行(尾号3089)"
        brief="展示摘要描述"
        addon="附加文案"
        arrow
      />
      <md-cell-item
        title="交通银行"
        brief="展示摘要描述"
        addon="附加文案"
        arrow
      >
        <template #left>
          <span class="holder"></span>
        </template>
      </md-cell-item>
      <md-cell-item
        title="招商银行"
        brief="展示摘要描述"
        addon="禁用的项目"
        disabled
        arrow
      >
        <template #left>
          <span class="holder"></span>
        </template>
      </md-cell-item>
      <md-cell-item
        title="Mand Mobile"
        brief="A mobile UI toolkit"
        arrow
      >
        <template #children>
          <p style="font-size: 0.24rem; color: #858b9c">
            面向金融场景的Vue移动端UI组件库，丰富、灵活、实用，快速搭建优质的金融类产品，让复杂的金融场景变简单。基于「合理、好用」设计价值观，从交互操作、视觉抽象、图形可视等角度共同解决问题。
          </p>
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
