<script lang="ts">
export default {
  name: 'CheckDemo',
  title: '复选框',
}
</script>
<script setup lang="ts">
import { ref } from 'vue'
import { CheckBox as MdCheckBox } from 'mand-mobile-next/check'

const pay = ref('')
const check = ref(true)
</script>

<template>
  <div
    class="
      md-example-child
      md-example-child-check
      md-example-child-check-2
    "
  >
    <md-check-box v-model="check" label="日缴" disabled />
    <md-check-box v-model="pay" name="month" label="月付" />
    <md-check-box
      v-model="pay"
      name="season"
      label="季度费"
    />
  </div>
</template>

<style lang="stylus">
.md-example-child-check-2
  .md-check-box
    margin-right 8px
</style>
