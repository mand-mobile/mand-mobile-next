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
import Stepper from 'mand-mobile/lib/stepper'
import Field from 'mand-mobile/lib/field/index'
import FieldItem from 'mand-mobile/lib/field/item'

export default {
  name: 'stepper-demo',
  /* DELETE */
  title: '禁用',
  titleEnUS: 'Disabled',
  /* DELETE */
  components: {
    'md-stepper': Stepper,
    'md-field': Field,
    'md-field-item': FieldItem,
  },
}

</script>
