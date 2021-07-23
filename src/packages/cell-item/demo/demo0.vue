<script lang="ts">
export default {
  name: 'CellItemDemo',
  title: '基本',
}
</script>
<script setup lang="ts">
import MdCellItem from 'mand-mobile-next/cell-item'
import MdField from 'mand-mobile-next/field'

const onClickHandler = (e: UIEvent) => {
  console.log(e.target)
}
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
        title="普通条目"
        @click="onClickHandler"
      />
      <md-cell-item
        title="动作条目"
        arrow
        @click="onClickHandler"
      />
      <md-cell-item
        title="禁用条目"
        disabled
        @click="onClickHandler"
      />
    </md-field>
  </div>
</template>
