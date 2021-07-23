<script lang="ts">
export default {
  name: 'StepperDemo',
  title: '禁用',
}
</script>
<script setup lang="ts">
import MdField from 'mand-mobile-next/field'
import MdFieldItem from 'mand-mobile-next/field-item'
import MdStepper from 'mand-mobile-next/stepper'
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
      <md-field-item title="禁用">
        <md-stepper disabled />
      </md-field-item>
    </md-field>
  </div>
</template>
