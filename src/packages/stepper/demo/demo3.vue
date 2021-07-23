<script lang="ts">
export default {
  name: 'StepperDemo',
  title: '输入整数',
}
</script>
<script setup lang="ts">
import MdField from 'mand-mobile-next/field'
import MdFieldItem from 'mand-mobile-next/field-item'
import MdStepper from 'mand-mobile-next/stepper'
import { ref } from 'vue'

const value = ref(0)
</script>

<template>
  <div
    class="
      md-example-child
      md-example-child-stepper
      md-example-child-stepper-0
    "
  >
    <md-field>
      <md-field-item title="步进2, 只允许输入整数">
        <md-stepper
          v-model="value"
          :step="2"
          :min="2"
          is-integer
        />
      </md-field-item>
    </md-field>
  </div>
</template>
