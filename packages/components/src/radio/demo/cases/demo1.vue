<template>
  <div class="md-example-child md-example-child-radio md-example-child-radio-1">
    <md-field>
      <md-field-item title="婚姻状况" solid>
        <md-radio name="2" v-model="marriage" label="已婚" inline />
        <md-radio name="1" v-model="marriage" label="未婚" inline />
        <md-radio name="3" v-model="marriage" label="保密" inline />
      </md-field-item>
    </md-field>
  </div>
</template>

<script>
import Radio from 'mand-mobile/lib/radio'
import Field from 'mand-mobile/lib/field'
import FieldItem from 'mand-mobile/lib/field/item'

export default {
  components: {
    'md-field': Field,
    'md-field-item': FieldItem,
    'md-radio': Radio,
  },
  data() {
    return {
      marriage: '2',
    }
  },
}
// #region ignore
export const metaInfo = {
  'zh-CN': {
    title: '表单项内联',
  },
  'en-US': {
    title: 'Field items',
  },
}
// #endregion ignore

</script>
