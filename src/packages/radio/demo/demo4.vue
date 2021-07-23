<script lang="ts">
export default {
  name: 'RadioDemo',
  title: '单选框',
}
</script>
<script setup lang="ts">
import { ref } from 'vue'
import { RadioBox as MdRadioBox } from 'mand-mobile-next/radio'

const checked = ref('0')
</script>

<template>
  <div
    class="
      md-example-child
      md-example-child-radio
      md-example-child-radio-4
    "
  >
    <md-radio-box
      v-model="checked"
      name="0"
      label="单选项1"
    />
    <md-radio-box
      v-model="checked"
      name="1"
      label="单选项2"
    />
  </div>
</template>

<style lang="stylus">
.md-example-child-radio-4
  .md-radio-box
    margin-right 8px
</style>
