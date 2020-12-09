<template>
  <div class="md-example-child md-example-child-check md-example-child-check-0">
   <md-field title="复选项">
    <md-check v-model="checked" label="复选项" />
    <md-check label="禁用" disabled />
   </md-field>
	</div>
</template>

<script>
import Check from 'mand-mobile/lib/check'
import Field from 'mand-mobile/lib/field'

export default {
  components: {
    'md-check': Check,
    'md-field': Field,
  },
  data() {
    return {
      checked: false,
    }
  },
}
// #region ignore
export const metaInfo = {
  'zh-CN': {
    title: '复选项',
  },
  'en-US': {
    title: 'Check options',
  },
}
// #endregion ignore

</script>
