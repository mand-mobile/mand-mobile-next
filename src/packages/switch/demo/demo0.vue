<script lang="ts">
export default {
  name: 'SwitchDemo',
  title: '基本',
}
</script>
<script setup lang="ts">
import { ref } from 'vue'
import MdSwitch from 'mand-mobile/switch'

const isActive = ref(false)
const isActive_one = ref(true)
const isActive_two = ref(true)
const isActive_three = ref(false)
</script>

<template>
  <div
    class="
      md-example-child
      md-example-child-switch
      md-example-child-switch-0
    "
  >
    <md-switch v-model="isActive"></md-switch>
    <br />
    <md-switch v-model="isActive_one"></md-switch>
    <br />
    <md-switch v-model="isActive_two" disabled></md-switch>
    <br />
    <md-switch
      v-model="isActive_three"
      disabled
    ></md-switch>
  </div>
</template>
