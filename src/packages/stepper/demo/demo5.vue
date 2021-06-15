<script lang="ts">
export default {
  name: 'StepperDemo',
  title: 'step为小数',
}
</script>
<script setup lang="ts">
import MdField from 'mand-mobile/field'
import MdFieldItem from 'mand-mobile/field-item'
import MdStepper from 'mand-mobile/stepper'
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
      <md-field-item title="step为小数1.3">
        <md-stepper :step="1.3" />
      </md-field-item>
    </md-field>
  </div>
</template>
