<script lang="ts">
export default {
  name: 'CheckDemo',
  title: '基本',
}
</script>
<script setup lang="ts">
import { ref } from 'vue'
import MdCheck from 'mand-mobile-next/check'

const checked = ref(false)
const pay = ref('')
</script>

<template>
  <div
    class="
      md-example-child
      md-example-child-check
      md-example-child-check-1
    "
  >
    <md-check v-model="checked" label="复选项" />
    <md-check label="禁用" disabled />
    <md-check v-model="pay" name="month" label="月付" />
  </div>
</template>
