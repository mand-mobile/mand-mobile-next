<template>
  <div class="md-example-child md-example-child-stepper md-example-child-stepper-2">
    <md-field>
      <md-field-item title="最小值-12，最大值18">
        <md-stepper slot="right" v-model="value" min="-12" max="18" />
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
  title: '最小值-12，最大值18',
  titleEnUS: 'Minimum is -12 and maximum is 18',
  /* DELETE */
  components: {
    // [Field.name]: Field,
    // [FieldItem.name]: FieldItem,
    // [Stepper.name]: Stepper,
    'md-stepper':Stepper,
    'md-field':Field,
    'md-field-item':FieldItem
  },
  data() {
    return {
      value: 0,
    }
  },
}

</script>
