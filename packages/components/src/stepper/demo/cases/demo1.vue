<template>
  <div class="md-example-child md-example-child-stepper md-example-child-stepper-1">
    <md-field>
      <md-field-item title="只读">
        <md-stepper slot="right" read-only />
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
    title: '只读',
  },
  'en-US': {
    title: 'Readonly',
  },
}
// #endregion ignore

</script>
