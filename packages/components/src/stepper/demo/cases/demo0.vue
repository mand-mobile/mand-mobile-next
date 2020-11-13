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
  components: {
    'md-stepper': Stepper,
    'md-field': Field,
    'md-field-item': FieldItem,
  },
}
// #region ignore
export const metaInfo = {
  'zh-CN': {
    title: '禁用',
  },
  'en-US': {
    title: 'Disabled',
  },
}
// #endregion ignore

</script>
