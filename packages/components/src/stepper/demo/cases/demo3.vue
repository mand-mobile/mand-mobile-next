<template>
  <div class="md-example-child md-example-child-stepper md-example-child-stepper-3">
    <md-field>
      <md-field-item title="步进2, 只允许输入整数">
        <md-stepper slot="right" v-model="value" :step="2" :min="2" is-integer />
      </md-field-item>
    </md-field>
  </div>
</template>

<script>
import Stepper from 'mand-mobile/lib/stepper'
import Field from 'mand-mobile/lib/field/index'
import FieldItem from '.mand-mobile/lib/field/item'

export default {
  name: 'stepper-demo',
  /* DELETE */
  title: '步进2',
  titleEnUS: 'Step 2',
  /* DELETE */
  components: {
    'md-stepper': Stepper,
    'md-field': Field,
    'md-field-item': FieldItem,
  },
  data() {
    return {
      value: 3,
    }
  },
}

</script>
