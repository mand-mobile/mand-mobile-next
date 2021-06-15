<script lang="ts">
export default {
  name: 'RadioDemo',
  title: '单选项组',
}
</script>
<script setup lang="ts">
import { ref } from 'vue'
import MdRadio from 'mand-mobile/radio'
import MdRadioGroup from 'mand-mobile/radio-group'

const favorites = ref('apple')
</script>

<template>
  <div
    class="
      md-example-child
      md-example-child-radio
      md-example-child-radio-0
    "
  >
    {{ favorites }}
    <md-radio-group v-model="favorites">
      <md-radio name="watermelon" label="西瓜" />
      <md-radio name="apple" label="苹果" />
      <md-radio name="banana" label="香蕉" />
      <md-radio name="orange" label="橙子" />
      <md-radio name="tomato" label="西红柿" disabled />
    </md-radio-group>
  </div>
</template>
