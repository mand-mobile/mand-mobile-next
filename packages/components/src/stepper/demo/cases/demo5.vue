<template>
  <div class="md-example-child md-example-child-stepper md-example-child-stepper-5">
    <md-field>
      <md-field-item title="step为小数1.3">
        <md-stepper slot="right" :step="1.3" />
      </md-field-item>
    </md-field>
  </div>
</template>

<script>
import Stepper from '../../index'
import Field from '../../../field/index'
import FieldItem from '../../../field/item'

export default {
  name: 'stepper-demo',
  /* DELETE */
  title: 'step为小数1.3',
  titleEnUS: 'Step is a decimal, 1.3',
  /* DELETE */
  components: {
    'md-stepper': Stepper,
    'md-field': Field,
    'md-field-item': FieldItem,
  },
}

</script>
