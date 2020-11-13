<template>
  <div class="md-example-child md-example-child-stepper md-example-child-stepper-4">
    <md-field>
      <md-field-item title="最小值4大于默认值">
        <md-stepper slot="right" :min="4" />
      </md-field-item>
    </md-field>
  </div>
</template>

<script>
import Stepper from 'mand-mobile/lib/stepper'
import Field from 'mand-mobile/lib/field/index'
import FieldItem from 'mand-mobile/lib/field/item'

export default {
  components: {
    'md-stepper': Stepper,
    'md-field': Field,
    'md-field-item': FieldItem,
  },
}
// #region ignore
export const metaInfo = {
  'zh-CN': {
    title: '最小值4大于默认值',
  },
  'en-US': {
    title: 'Minimum is 4 which is greater than default',
  },
}
// #endregion ignore

</script>
