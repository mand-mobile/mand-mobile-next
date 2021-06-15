<script lang="ts">
export default {
  name: 'StepperDemo',
  title: '最小最大',
}
</script>
<script setup lang="ts">
import MdField from 'mand-mobile/field'
import MdFieldItem from 'mand-mobile/field-item'
import MdStepper from 'mand-mobile/stepper'
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
      <md-field-item title="最小值-12，最大值18">
        <md-stepper v-model="value" min="-12" max="18" />
      </md-field-item>
    </md-field>
  </div>
</template>
