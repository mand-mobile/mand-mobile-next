<template>
  <div class="md-example-child md-example-child-stepper md-example-child-stepper-0">
    <md-field>
      <md-field-item title="禁用">
        <md-stepper slot="right" disabled />
      </md-field-item>
    </md-field>
  </div>
</template>

<script>
// import {Stepper, Field, FieldItem} from 'mand-mobile'
import Stepper from '../../index'
import Field from '../../../field/index'
import FieldItem from '../../../field/item'

export default {
  name: 'stepper-demo',
  /* DELETE */
  title: '禁用',
  titleEnUS: 'Disabled',
  /* DELETE */
  components: {
    // [Field.name]: Field,
    // [FieldItem.name]: FieldItem,
    // [Stepper.name]: Stepper,
    'md-stepper':Stepper,
    'md-field':Field,
    'md-field-item':FieldItem
  },
}

</script>
