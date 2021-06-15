<script lang="ts">
export default {
  name: 'RadioDemo',
  title: '基本',
}
</script>
<script setup lang="ts">
import { ref } from 'vue'
import MdRadio from 'mand-mobile/radio'

const checked = ref('0')
</script>

<template>
  <div
    class="
      md-example-child
      md-example-child-radio
      md-example-child-radio-0
    "
  >
    <md-radio v-model="checked" name="0" label="单选项1" />
    <md-radio v-model="checked" name="1" label="单选项2" />
  </div>
</template>
